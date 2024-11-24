ARG PYTHON_VERSION=python:3.11-alpine
FROM $PYTHON_VERSION AS dependency-base

ENV PROJECT_DIR=/app
# Set the working directory
WORKDIR $PROJECT_DIR

# Copy requirements.txt
COPY ./requirements.txt ./

FROM dependency-base AS production-base

COPY --chown=python:python . $PROJECT_DIR

# Install dependencies
# RUN source venv/bin/activate

RUN pip install --no-cache-dir -r requirements.txt

FROM production-base AS production

USER python

COPY --from=production-base $PROJECT_DIR .

# Expose the application port and start the application
EXPOSE 5000


CMD ["python", "app.py"]