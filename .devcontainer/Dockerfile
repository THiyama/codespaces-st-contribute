FROM ubuntu:20.04

EXPOSE 3000
EXPOSE 8501

RUN apt-get update && apt-get upgrade -y

# タイムゾーン
RUN ln -fs /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apt-get install -y tzdata && \
    dpkg-reconfigure --frontend noninteractive tzdata

# Streamlit Contributeに必要なパッケージ
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y curl sudo git gnupg gnupg2 gnupg1 unzip rsync vim make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev wget llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev \
    liblzma-dev python3-openssl mysql-client libmysqlclient-dev unixodbc-dev graphviz python3-distutils \
    npm python3-pip protobuf-compiler libgconf-2-4 nodejs python3.8-venv

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarnpkg-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/yarnpkg-archive-keyring.gpg] https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && apt-get install -y nodejs

RUN PROTOC_ZIP=protoc-3.20.3-linux-x86_64.zip && \
    curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.20.3/$PROTOC_ZIP && \
    unzip -o $PROTOC_ZIP -d /usr/local bin/protoc && \
    unzip -o $PROTOC_ZIP -d /usr/local 'include/*' && \
    rm -f $PROTOC_ZIP && \
    chmod a+x /usr/local/bin/protoc
