from flask import Blueprint, request, jsonify
from nltk.tokenize import sent_tokenize
from transformers import pipeline
import nltk

# if not downloaded
# download the punkt tokenizer model for sentence tokenization
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt')
    nltk.download('punkt_tab')

# define blueprint
dash_bp = Blueprint('dash', __name__)

# load huggingface models
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
sentiment_analyzer = pipeline("sentiment-analysis")

# TODO: move to database
# predefined labels
LABELS = [
    "stress",
    "anxiety",
    "depression",
    "mood",
    "energy",
    "sleep",
    "appetite",
    "motivation",
    "concentration",
    "social",
    "irritability",
    "hopelessness",
    "self-esteem",
    "emotional stability",
    "clarity",
    "rumination",
    "overwhelm",
    "gratitude",
    "confidence",
    "fatigue",
    "restlessness",
    "tension",
    "exercise",
    "hydration",
    "nutrition",
    "body image",
    "pain",
    "productivity",
    "focus",
    "routine",
    "time management",
    "task completion",
    "distraction",
    "organization",
    "loneliness",
    "connection",
    "communication",
    "support",
    "conflict",
    "boundaries",
    "resilience",
    "coping skills",
    "mindfulness",
    "self-care",
    "emotional regulation",
    "growth mindset"
]


# TODO: figure out how this works
@dash_bp.route('/log', methods=['POST'])
def log():
    # convert json request data to python dictionary
    data = request.get_json()
    logentry = data['logentry']
    # separate into sentences
    sentences = sent_tokenize(logentry)

    tagged_sentences = []
    for sentence in sentences:
        classification_result = classifier(sentence, LABELS)
        top_label = classification_result['labels'][0]
        classification_confidence = classification_result['scores'][0]

        sentiment_result = sentiment_analyzer(sentence)[0]
        sentiment_label = sentiment_result['label']  # POSITIVE or NEGATIVE
        sentiment_confidence = sentiment_result['score']

        tagged_sentences.append({
            "sentence": sentence,
            "label": top_label,
            "label_confidence": classification_confidence,
            "sentiment": sentiment_label,
            "sentiment_confidence": sentiment_confidence
        })

    print(tagged_sentences)

    return jsonify({"tagged_sentences": tagged_sentences}), 200