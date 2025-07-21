import pandas as pd
from app import db
from app.models import Log, Metric
from sqlalchemy import select
from sklearn.cluster import KMeans


def get_metric_dataframe(user_id):
    query = (
        select(Log.timestamp, Log.value, Metric.name)
        .join(Metric, Log.metric_id == Metric.id)
        .where(Metric.user_id == user_id)
    )
    # open db connection with sqlalchemy
    with db.engine.connect() as conn:
        # read query into dataframe
        # stmt is select object, unexecuted query
        # use sqlalchemy engine to run query
        df = pd.read_sql(query, conn)
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


def get_correlations(user_id, metric):
    df = get_metric_dataframe(user_id)
    pivoted = get_pivoted_metrics(df)
    # if table is empty return empty dict
    if pivoted.empty:
        return {}
    # if table has <= 1 column or row replace NaN values
    # 1 for self comparison, 0 for diagonal comparison
    # shape[1] columns, shape[0] rows
    if pivoted.shape[1] == 1 or pivoted.shape[0] == 1:
        default = pivoted.corr()
        for row in default.index:
            for col in default.columns:
                default.at[row, col] = 1 if row == col else 0
        metric_default = default[metric]
        correlations = {'week' : metric_default.to_dict(), 
                        'month': metric_default.to_dict(), 
                        'year': metric_default.to_dict(),
        }
        return correlations
    # get corrs in spans
    week = pivoted.tail(7).corr()[metric].to_dict()
    month = pivoted.tail(30).corr()[metric].to_dict()
    year = pivoted.tail(365).corr()[metric].to_dict()
    correlations = {'week' : week, 
                    'month': month, 
                    'year': year,
    }
    return correlations


def get_averages(user_id, metric):
    df = get_metric_dataframe(user_id)
    pivoted = get_pivoted_metrics(df)
    # if table is empty return empty dict
    if pivoted.empty:
        return {}
    # get averages in spans
    week = pivoted[metric].tail(7).mean()
    month = pivoted[metric].tail(30).mean()
    year = pivoted[metric].tail(365).mean()
    averages = {'week': week, 'month': month, 'year': year}
    # return dict
    return averages


def get_clusters(user_id):
    df = get_metric_dataframe(user_id)
    pivoted = get_pivoted_metrics(df)
    # if table is empty or has less than 10 rows return empty dict
    if pivoted.empty or pivoted.shape[0] < 10:
        return {}

    kmeans = KMeans(n_clusters=10, random_state=0)
    kmeans.fit(pivoted)
    # labels = kmeans.labels_
    # get averaged cluster values
    center = kmeans.cluster_centers_
    # convert to df then dict
    # use columns from pivoted to get metrics
    center_df = pd.DataFrame(center, columns=pivoted.columns)
    # orient records so each row is dict, not column
    return center_df.to_dict(orient='records')