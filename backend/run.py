from app import create_app

# create flask app instance
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
