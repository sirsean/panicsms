FROM debian:latest

MAINTAINER Sean Schulte

RUN apt-get update --yes # 2016-03-04
RUN apt-get dist-upgrade --yes

RUN apt-get install --yes \
    curl \
    git

RUN curl -O https://storage.googleapis.com/golang/go1.6.linux-amd64.tar.gz

RUN tar -C /usr/local -xzf go1.6.linux-amd64.tar.gz

ENV PATH $PATH:/usr/local/go/bin

ENV GOPATH /

ADD . /src/github.com/sirsean/panicsms
WORKDIR /src/github.com/sirsean/panicsms

RUN go version

RUN go build

ENTRYPOINT ["./panicsms"]
