Xapo requieres that all the jenkins runner are deployed as docker images. Steps to start running the jenkins container with all dependencies are:
* Create the docker image from Dockerfile with the name: jenkins-apis
 * docker build -t jenkins-preconf-apis .

* Start a docker container from the created image
 * docker run -p 8080:8080 --name=jenkins-apis -d jenkins-preconf-apis

* Check if jenkins is running as expected
 * docker exec jenkins-apis -f /var/log/jenkins/jenkins.log
 * open web browser: localhost:8080
 * user testerbob
 * pass 2a072e04f7c9a4a39479cfad42601e9b

