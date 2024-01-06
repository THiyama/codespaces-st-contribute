# codespaces-st-contribute
GitHub Codespaces Environment for Streamlit Contribution

# 作成したCodespacesについての注意事項
- 作成したCodespacesは、時間制限を超えない限りは単体では無料枠で使用いただけます。
- ただし、他にCodespacesを作成している場合などは、無料枠の上限（特にストレージ）にかかる場合もございます。
    - 月の上限枠を超えると、意図せずCodespacesが削除されることや課金が開始することも考えられるのでご注意ください。
- イベントが終了したらCodespacesは削除するか、適切に利用管理をするようにしてください。
- 停止は無操作時に30分ほどで自動で行われますが、こまめな停止を心がけましょう。

# 1. Codespacesの起動
- [GitHub](https://github.com/)の右上の「＋▼」マークから「New codespace」をクリック
- 下記の設定を行い、「Create codespace」をクリック
    - Repository：THiyama/codespaces-st-contribute
    - Branch: main
    - Machine Type：4-core
        - 2-coreの場合、性能不足のためビルドが難しくなります。
        - 月間30時間までは、無料でこの環境を使用することができます。
    - それ以外はデフォルトでOKです。
- Setting up your codespace という画面が表示されるので、View logsをクリックし、実行ログを確認する
    - Codespaces上に最低限の環境構築が完了します。完了すると、ブラウザ上にVSCodeが起動するはずです。
    - この環境は、筆者が配布しているコンテナより作成されます。このコンテナは、https://github.com/streamlit/streamlit/wiki/Contributing の操作が機能するUbuntu20.04環境となっています。

# 2. Streamlit Contribute環境の構築
- [Streamlitリポジトリ](https://github.com/streamlit/streamlit)を、自身のGitHubアカウントにフォークします
    - 「Fork▼」をクリックし、「Create a new fork」をクリックします
    - Forkしたリポジトリ名は任意ですが、以下の手順は「streamlit」というリポジトリ名で記述しています。
    - なお、フォークしたリポジトリは、ワークショップ後削除いただいて問題ありません。リポジトリの設定から削除することができます。
- フォークしたStreamlitリポジトリをCodespaces環境にクローンします。
    - git clone https://github.com/GitHubユーザー名/streamlit.git
        - 一度テキストエディタにコピーして編集してから貼り付けたほうが編集がしやすいです。
    - cd streamlit
    - git remote add remote https://github.com/streamlit/streamlit.git
    - git checkout develop
    - git submodule update --init
    - git checkout -b feature/fires 3eb3f84a3ef80b867f0f313b3149caacb9f88bd3
        - 12月20日時点のコミットに基づいてブランチを作成します。（ハンズオンでの挙動固定のため）

- Streamlit Contribute環境のビルド準備
    - cd lib
    - python3 -m venv venv
    - source venv/bin/activate
    - cd ..
    - sudo apt install default-jdk -y
- Streamlit Contribute環境のビルド
    - export GITHUB_REPOSITORY=streamlit/streamlit
    - make all-devel
        - パッケージのダウンロードやインストールが開始されればOKです。10分ほどでビルドが完了します。
        - ビルドの途中で、Pysparkに関するエラーが表示されますが、その後自動的に修復されるため気にしなくて大丈夫です。

# 3. Streamlit Contribute作業の開始
- CodespacesをローカルのVSCodeで起動
    - [GitHub Codespaces](https://github.com/codespaces)にアクセスします。
    - 前章までで構築したCodespacesの三点リーダー「・・・」から「Open in ...」をクリックし、「Open in Visual Studio Code」をクリック
    - ローカルのVSCodeを起動して良いかポップアップが表示されるので許可
    - VSCode上でGitHub Codespacesを使用するためのツールがインストールされるまで待機
    - VSCodeの起動が完了したら、VSCode上部の「Terminal」から「New Terminal」をクリック
        - VSCodeの下部に、CodespacesのTerminalが表示されます。
- ビルドサーバーの起動
    - source streamlit/lib/venv/bin/activate
    - cd streamlit/frontend
    - yarn start
        - ターミナルに青字で「Starting the development server...」と表示されると同時に、ブラウザでlocalhost:3000が起動します。このタイミングでは、画面に何も表示されていないですが問題ありません。次の項目の「Streamlitアプリの作成」を実施後に内容が表示されてきます。
        - ビルド完了・ビルドサーバーの起動まで待機します（初回のみ5分程度かかります。結構長く感じるので気長に待ちましょう）。
            - 完了すると、緑字で「Compiled successfully!」や「No issues fouund.」と出力されると同時に、ブラウザ側でStreamlitのUIで「Please wait...」と表示されます。
        - その間、次のStreamlitアプリの作成に移ります。
- Streamlitアプリの作成
    - 再度VSCodeの「New Terminal」からターミナルを起動し、下記コマンドを実行します
        - source streamlit/lib/venv/bin/activate
        - mkdir st_app
        - cd st_app
        - code main.py
    - VSCode上でmain.pyが開くため、下記のプログラムを入力し、保存します
        ```python
        import streamlit as st

        st.title("Develop st.fires()")
        if st.button("submit balloons()"):
            st.balloons()
        if st.button("submit snow()"):
            st.snow()
        if st.button("submit fires()"):
            st.fires()
        ```
    - ターミナルで、下記コマンドを実行します
        - streamlit run main.py
    - すると、ブラウザ側のStreamlitに、アプリが表示されます。
        - ただし、ビルドサーバーの起動が完了していない場合は表示されません。ビルドサーバーの起動を待ちましょう。
    - なお、このタイミングでは、`st.fires()`は機能しません。4.2節の手順を実行して、再度確認してみてください。
- Streamlit（自体）の開発
    - ここまでで、Streamlitの開発を行う環境が整いました。
        - ここまでの環境構築により、Streamlit自体のソースコードを修正すると自動的にビルドが実行され、ブラウザで表示しているStreamlitアプリが変化することを確認できます。
        - そのため、ここで立ち上げたyarnのビルドサーバーとstreamlitを止めることなく、streamlit自体の修正が反映されることになります。
    - ここからは、Streamlit自体の開発を行っていきます。変更内容は、次章移行を参考にしてみてください。
    - なお、ターミナルを追加で使用したい場合は、これまでと同じ手順でターミナルを追加してください。
# 4. Streamlitの開発
## パターン１：風船（st.balloons）のサイズや動きを変えてみる
こちらはパラメータ変更やちょっとしたコード変更だけのため、リーズナブルな変更です。なお、前章最下部にも書いていますが、この変更のために更に新しいターミナル上で操作を行います。（前章で立ち上げた2つのサーバーは起動したままで大丈夫です。）
- Balloonsのコードフォルダに移動する
    - cd streamlit/frontend/lib/src/components/elements/Balloons
    - code styled-components.ts
- 風船のサイズを変更する
    - 下記のパラメータを変更して保存する
        ```TypeScript
        // 20行目付近を変更
        const IMAGE_HEIGHT = 450  // 元は300
        const IMAGE_WIDTH = 181   // 元は121
        ```
- 風船の動きを変更する
    - 下記のコードを追加・変更して保存する
        ```TypeScript
        // 35行目付近に追加
        const moveDown = keyframes`
          to {
            transform: translateY(calc(100vh + ${IMAGE_HEIGHT}px));
          }

          from {
            transform: translateY(0);
          }
        `

        // animationNameの行を変更（58行目付近）
          animationName: moveDown,  // 元はmoveUp
        ```

## パターン２：st.snowがあるなら、st.firesを作ってみよう
続いては、Streamlitへの機能追加となります。今回の例では主に実装を扱いテストには触れていませんが、実際のContributeの際はこうしたテストも議論し実装する必要があることに注意しましょう。
- 実行中のビルドサーバー（１つ目のターミナル）およびStreamlitアプリ（２つ目のターミナル）をCtrl+Cで停止します
- st_firesの資材を移動し`st.fires()`を作成します。下記の操作は、１つ目のターミナルで行います。
    - cd /workspaces/codespaces-st-contribute
    - cp -r st_fire/streamlit/* streamlit/
- Protocol Bufferの構成を変更した場合、コンパイルが必要なため、コンパイルを実行します
    - cd streamlit
    - make protobuf
- 再度ビルドサーバーおよびStreamlitアプリを起動します。
    - ビルドサーバーの起動（１つ目のターミナル）
        - cd frontend
        - yarn start
    - Streamlitアプリの起動（２つ目のターミナル）
        - streamlit run main.py
- そして、`st.fires`のボタンをクリックして、炎が浮かび上がってきたら成功です！🎉時間が余っている方は、パラメータの調整やソースコードの確認をしてみてください。
    - ソースコードの確認は、`/workspaces/codespaces-st-contribute/st_fires/`から行えます
    - ほとんどちょっとした設定の書き換えであることが多く、これはStreamlitの設計が良いため機能拡張が容易な構成になっているからと言えるでしょう！

# 5. StreamlitにContributeする
すべての変更が終わったら、Pull Requestの準備を始めましょう。Pull Requestまでは、コードのテスト、Gitへのコミット、フォークしたリポジトリへのPush、そしてオリジナルのリポジトリへのマージ（Pull Request）があります。ここでは、フォークしたリポジトリへのPushまでは行って良いですが、Pull Requestは行わないようにしましょう。
- 実行中のビルドサーバー（１つ目のターミナル）、Streamlitアプリ（２つ目のターミナル）をCtrl+Cで停止します
- テストを実施します。ひとまずテストが実行されていればOKです。今回は追加したコード以外の変更を行っていませんが、いくつかのケースでFAILEDになっている場合があります。その場合は、追加したコードが影響を及ぼしている場合があるので、適切に修正するようにしましょう。（今回は割愛させていただきます）
    - cd /workspaces/codespaces-st-contribute/streamlit
    - make pytest
    - make jstest
        - jstestで一部のケースがスタックすることがあり、400s以上かかっている場合は一度Ctrl+Cでテストを停止してから、再度テストコマンド（`make jstest`）を実行してみてください。
- コミット・Pushを行います
    - git add .
    - git commit -m "Add st.fires() function for enhanced visualization"
    - GITHUB_TOKEN=＜Developer Token＞
        - 現在、GitHubはDeveloper向けにトークンによる認証を提供しており、従来のパスワード認証は廃止されています。そのため、Developerキーを取得（リポジトリの操作権限があればOKです）して、上記環境変数に追加してください
    - git push origin feature/fires
- Pull Requestの操作方法
    - 自身のフォークリポジトリから、Pushしたコードが反映されていることを確認します
    - このとき、Pull Requestボタンがあるので、ここからPull Requestを作成することができます
        - Draftであっても反映されるため、Pull Requestは行わないようにしましょう。

# おまけ
## Dockerfileから開発環境を構築したい場合
Codespacesを作成するUI（「1. Codespacesの起動」の手順）で、ブランチを`main`から`dockerfile`に切り替えます。


→最初にDockerfileをもとにパッケージのダウンロードなどが始まります。あとの操作は「1. Codespacesの起動」以降と同様です。


## ローカルのコンテナとして動作させたい場合
GitHub Container Registryに登録されているコンテナイメージをダウンロードし、それをもとにDockerコンテナを作成することができます。もちろん、.devcontainer/内のdockerfileをもとにbuildしてもOKです。下記はコンテナイメージをダウンロードする手順の例です。
- docker pull ghcr.io/thiyama/st-ubuntu-image:latest
- docker run -it -d -p 3000:3000 -p 8501:8501 --name <任意のコンテナ名> ghcr.io/thiyama/st-ubuntu-image:latest
- docker container start <任意のコンテナ名>
- docker container exec -it <任意のコンテナ名> /bin/bash


→あとの操作はCodespacesの場合と同様になります。なお、先述の通り安定的な動作のためにはメモリ16GB以上を推奨します。
