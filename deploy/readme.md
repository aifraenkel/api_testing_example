Xapo requieres that all the jenkins runner are deployed as docker images. Steps to start running the jenkins container with all dependencies are:
* Create the docker image from Dockerfile with the name: jenkins-apis-testing
 * docker build -t jenkins-apis-testing .
* Start a docker container from the created image
 * docker run -p 8080:8080 --name=jenkins-apis-testing-runner -d jenkins-apis-testing
* Check if jenkins is running as expected
 * docker exec jenkins-apis-testing-runner tail -f /var/log/jenkins/jenkins.log
* Get the administrator password hash and start configuring jenkins plugins and jobs
 * docker exec jenkins-apis-testing-runner cat /var/jenkins_home/secrets/initialAdminPassword
 * open web browser: localhost:8080
 * put the password hash string
 * select plugins: Folders, Credential Binding, Timestamper, Workspace Cleanup, Gradle, JUnit, Conditional BuildStep, Multijob, Parametrized Trigger, Git, Matrix Auth.., Email Extension, Email Extension Template, Mailer
 * continue configuring administrator user
 * install allure plugin, test result, build result analyzer
 * configure global configuration settings: java_home to /usr/lib/jvm/java-8-openjdk-amd64/ , gradle 5.0, allure 2.5
 * create a job and test regression
