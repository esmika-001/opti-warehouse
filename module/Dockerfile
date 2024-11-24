# Base image for Python 3.11 on Alpine
ARG PYTHON_VERSION=python:3.12-alpine
FROM $PYTHON_VERSION AS dependency-base

RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    g++ \
    libc-dev \
    python3-dev \
    libffi-dev \
    musl-dev \
    meson
    
ENV PROJECT_DIR=/app
WORKDIR $PROJECT_DIR

# Install dependencies for compiling certain packages (e.g., cryptography)
# RUN apk update && apk add --no-cache gcc musl-dev libffi-dev

# Copy requirements and install Python dependencies
COPY ./requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r  requirements.txt

# Production image to copy the application code
FROM dependency-base AS production-base

COPY --chown=python:python . $PROJECT_DIR

# Final image for running the application
FROM production-base AS production

USER python

# Copy application code
COPY --from=production-base $PROJECT_DIR .

# Expose the port
EXPOSE 5000

# Start the application
CMD ["python", "app.py"]  # Adjust depending on your actual app start command
