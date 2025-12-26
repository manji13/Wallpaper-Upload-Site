import os
# Set local directory for model download to /tmp (Vercel requires this)
os.environ['U2NET_HOME'] = '/tmp/.u2net'

from flask import Flask, request, send_file
from rembg import remove, new_session
from io import BytesIO
from PIL import Image

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "✅ Python background remover server is running!"

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'image' not in request.files:
        return {"error": "No image uploaded"}, 400

    file = request.files['image']
    input_image = file.read()

    try:
        # Create session (will download to /tmp on Vercel)
        session = new_session("u2net")

        output_bytes = remove(
            input_image,
            alpha_matting=True,
            alpha_matting_foreground_threshold=260,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=15,
            session=session
        )

        img = Image.open(BytesIO(output_bytes)).convert("RGBA")

        # Clean faint edge pixels
        pixels = img.load()
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = pixels[x, y]
                if a < 20:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    pixels[x, y] = (min(255, int(r * 1.05)), min(255, int(g * 1.05)), b, a)

        buf = BytesIO()
        img.save(buf, format="PNG", optimize=False)
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        print("❌ Background removal failed:", str(e))
        return {"error": f"Background removal failed: {str(e)}"}, 500

# Vercel requires the app variable to be available at module level
# We don't need app.run() for Vercel
if __name__ == '__main__':
    app.run(port=5001)