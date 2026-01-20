from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

#create connection
connection = pymysql.connect(
    host="localhost",
    user="marty",
    passwd="letmein",
    db="macrotracker"
)

print("Connected...")

# make SQL queries and return a tuple of table results
def Query(query):
    with connection.cursor() as cursor:
        try:
            cursor.execute(query)
        except Exception as e:
            print ("oops... Something Went Wront :( Check", e)
            return
        result = cursor.fetchall()
    connection.commit()
    return result

# starting page/ the only page that I have
@app.route('/search', methods=['GET','POST'])
# function for loading/working within the page
def index():
    # if we call a posting function from the page then we do this
    if request.method == "POST":
        # get input from page
        data = request.get_json(force=True)
        print("Incoming JSON:", data)
        Food = data.get('title')
        print(Food)
        # SQL Query for food name
        sql = f"SELECT * FROM food WHERE Name = \"{Food}\""
        # two dimensional tuple so we need to go into the first result to get real data
        results = Query(sql)
        print(results)
        row = results[0]
        return jsonify({
            "message": "Food received",
            "food": {
                "id": row[0],
                "name": row[1],
                "calories": row[2],
                "protein": row[3],
                "carbs": row[4],
                "fats": row[5]
            }
        })
    else:
        return jsonify({"error": "Invalid data format or missing 'title' key"}), 400

# run app
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)