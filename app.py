from flask import Flask, request, render_template, jsonify
import time
import random
import requests
app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return render_template('index.html')
import traceback

@app.route("/summarization", methods=["GET", "POST"])
def index():
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": "Bearer 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"}

    if request.method == "POST":
        text = request.form["text"]
        input_length = len(text)
        min_length = max(1, int(input_length * 0.05))
        
        response = requests.post(API_URL, headers=headers, json={
            "inputs": text,
            "parameters": {
                "max_length": min_length,
                "min_length": min_length
            }
        })
        result = response.json()
        summary = result[0]['summary_text']

        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({'summary': summary})
        else:
            return render_template("summarizer.html", summary=summary)

    return render_template("summarizer.html", summary="")
@app.route("/fakenews",methods=["GET", "POST"])
def fakenews():
    return render_template("fakeNews.html")
@app.route("/plagiarism",methods=["GET", "POST"])
def plagiarism():
    return render_template("plagiarism.html")
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
