from flask import Flask, request, send_file
from rembg import remove
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# ---------------------------
# Homepage route (optional)
# ---------------------------
@app.route("/", methods=["GET"])
def home():
    return "✅ Python background remover server is running!"

# ---------------------------
# Background removal route
# ---------------------------
@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'image' not in request.files:
        return {"error": "No image uploaded"}, 400

    file = request.files['image']
    input_image = file.read()

    try:
        # Remove background
        output_image = remove(input_image)  # returns bytes

        # Ensure PNG with transparency using PIL
        img = Image.open(BytesIO(output_image)).convert("RGBA")
        buf = BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)

        return send_file(buf, mimetype='image/png')
    
    except Exception as e:
        print("❌ Background removal failed:", str(e))
        return {"error": "Background removal failed"}, 500

# ---------------------------
# Run server
# ---------------------------
if __name__ == '__main__':
    app.run(port=5001)
