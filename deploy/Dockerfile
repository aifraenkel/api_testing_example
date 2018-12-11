FROM jenkins/jenkins
LABEL maintainer=”aifraenkel@gmail.com”

USER root

# Install OpenJDK-8, Git, Gradle and setup Git http.sslVerify to false (because gitlab.practia.global limitations)
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y git && \ 
    apt-get install -y gradle && \
    apt-get clean;

COPY _.practia.global /usr/local/share/ca-certificates/

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Install node and dependencies
RUN apt-get install -y nodejs

# Setup Jenkins - Create Jenkins Log Folder
RUN mkdir /var/log/jenkins
RUN chown -R jenkins:jenkins /var/log/jenkins

USER jenkins

# Set default options
ENV JAVA_OPTS="-Xmx8192m"
ENV JENKINS_OPTS="--handlerCountMax=300 --logfile=/var/log/jenkins/jenkins.log"

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

