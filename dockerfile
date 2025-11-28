FROM eclipse-temurin:25-jdk-alpine

WORKDIR /app

COPY target/txlforma-latest.jar app.jar

EXPOSE 8080

RUN mkdir -p /workspace/uploads/images

VOLUME ["/workspace/uploads/images"]

ENTRYPOINT ["java","-jar","app.jar"]
