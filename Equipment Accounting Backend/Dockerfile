FROM ubuntu:25.10 AS build

RUN apt update -y
RUN apt install -y openjdk-21-jdk maven


RUN mkdir /code
COPY . /code

WORKDIR /code

RUN mvn clean package -DskipTests

FROM ubuntu:25.10 AS runtime

RUN apt update -y
RUN apt install -y openjdk-21-jdk

COPY --from=build /code/target/EquipmentAccountingBackend-1.0.0.jar /usr/bin/EquipmentAccountingBackend-1.0.0.jar

CMD ["java", "-jar", "/usr/bin/EquipmentAccountingBackend-1.0.0.jar"]

