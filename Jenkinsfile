pipeline {

  environment {
    PROJECT = "georgef-sandbox"
    REGION = "us-central1"
    APP_NAME = "reactsampleapp"
    FE_SVC_NAME = "${APP_NAME}-frontend"
    CLUSTER = "my-gke-cluster"
    CLUSTER_ZONE = "us-central1-a"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    TAG = "pronk"
  }

  agent {
    kubernetes {
      label 'sample-app'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
}
  }
  stages {
    stage('Build and push image with Cloud Build') {
      steps {
        container('gcloud') {
          sh "ls -la"
          sh "gcloud builds submit --region=${REGION} --tag ${REGION}-docker.pkg.dev/${PROJECT}/${APP_NAME}/reactsampeap:${TAG}"
          sh "echo ${PROJECT}"
        }
      }
    }

    stage('Deploy app to GKE') {
      steps {
        container('kubectl') {
          sh "kubectl apply -f k8s/deployment-config.yaml"
          sh "kubectl apply -f k8s/reactsampleapp.yaml"
        }
      }
    }

  }
}

// gcloud builds submit --region=${REGION} --tag ${REGION}-docker.pkg.dev/${PROJECT}/${APP_NAME}/reactsampeap:jenkins
