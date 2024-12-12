pipeline {

  environment {
    PROJECT = "georgef-sandbox"
    APP_NAME = "samplereactapp"
    FE_SVC_NAME = "${APP_NAME}-frontend"
    CLUSTER = "my-gke-cluster"
    CLUSTER_ZONE = "us-central1-a"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    JENKINS_CRED = "${PROJECT}"
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
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh "ls -la"
          sh ""
          sh "echo ${PROJECT}"
        }
      }
    }

  }
}

// gcloud builds submit --region=us-central1 --tag us-central1-docker.pkg.dev/georgef-sandbox/reactsampleapp/reactsampeap
