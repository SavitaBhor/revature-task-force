pipeline {
  agent any
  stages {
    stage('Build Angular') {
      agent {
        docker {
          image 'node:12.18-alpine'
          args '--mount type=bind,source=/home/ec2-user/deploy,target=/deploy'
        }

      }
      steps {
        sh '''npm i
npm run build
cp dist/todos-frontend/* /deploy'''
      }
    }

    stage('Deploy to S3') {
      agent {
        docker {
          image 'amazon/aws-cli'
          args '--mount type=bind,source=/home/ec2-user/deploy,target=/deploy --interactive --entrypoint=""'
        }

      }
      steps {
        sh 'aws s3 cp /deploy s3://my-jenkins-task-force-bucket-123 --recursive --acl public-read'
      }
    }

  }
}