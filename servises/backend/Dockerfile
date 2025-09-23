FROM python:3.12-alpine
WORKDIR /app
COPY requirements.txt .
RUN apk add --no-cache gcc musl-dev linux-headers \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del gcc musl-dev linux-headers
COPY . .
EXPOSE 8000
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
CMD ["sh","-c","python manage.py migrate && python manage.py collectstatic --noinput && gunicorn myproject.wsgi:application --bind 0.0.0.0:8000"]
