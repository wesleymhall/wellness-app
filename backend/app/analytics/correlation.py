import pandas as pd
from app import db
from app.models import Log, Metric
from sqlalchemy import select


def get_metric_dataframe(user_id):
    stmt = (
        select(Log.timestamp, Log.value, Metric.name)
        .join(Metric, Log.metric_id == Metric.id)
        .where(Metric.user_id == user_id)
    )
    # open db connection with sqlalchemy
    with db.engine.connect() as conn:
        # read query into dataframe
        # stmt is select object, unexecuted query
        # use sqlalchemy engine to run query
        df = pd.read_sql(stmt, conn)
    return df


def get_pivoted_metrics(df):
    # return empty dataframe if empty
    if df.empty:
        return pd.DataFrame()
    pivoted = df.pivot_table(
        index='timestamp',
        columns='name',
        values='value',
    )
    # reset index to make timestamp a normal column for data manipulation
    return pivoted


def get_correlations(user_id):
    df = get_metric_dataframe(user_id)
    pivoted = get_pivoted_metrics(df)
    # if table is empty return empty dict
    if pivoted.empty:
        return {}
    # if table has < 1 column or row replace NaN values
    # 1 for self comparison, 0 for diagonal comparison
    if pivoted.shape[1] == 1 or pivoted.shape[0] == 1:
        correlations = pivoted.corr()
        for row in correlations.index:
            for col in correlations.columns:
                correlations.at[row, col] = 1 if row == col else 0
        return correlations.to_dict()
    correlations = pivoted.corr()
    # convert df to nested dict for JSON
    return correlations.to_dict()