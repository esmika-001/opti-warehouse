# Base image for Python 3.11 on slim Debian-based image
FROM python:3.11-slim AS dependency-base

# Install necessary build tools and libraries for compiling pyarrow
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    make \
    libc-dev \
    python3-dev \
    libmagic-dev \
    && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Create a python user and group, and set permissions for the project directory
RUN groupadd -r python && useradd -r -g python python

# Set environment variables
ENV PROJECT_DIR=/app
WORKDIR $PROJECT_DIR

# Copy requirements and install Python dependencies
COPY ./requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --only-binary :all: -r requirements.txt
RUN pip install gunicorn

# Production image to copy the application code
FROM dependency-base AS production-base

# Copy the application code with ownership set to 'python' user
COPY --chown=python:python . $PROJECT_DIR

# Final image for running the application
FROM production-base AS production

# Switch to 'python' user
USER python

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]