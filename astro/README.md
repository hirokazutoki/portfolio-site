# Portfolio site

## How to start

```bash
yarn install
yarn dev
```

## pinact

GitHub Actions のワークフローファイルで、`uses:` に書かれたタグ(例: `@v7.0.0`)を、対応するコミットのフルダイジェスト(SHA)に自動で書き換えてくれるツール。サプライチェーン攻撃対策として Actions をコミットSHAで固定(pin)するのがベストプラクティスとされているが、それを手作業でやらずに済む。

- リポジトリ: [suzuki-shunsuke/pinact](https://github.com/suzuki-shunsuke/pinact)

### インストール

```bash
brew install suzuki-shunsuke/pinact/pinact
```

### 使い方

リポジトリルートで実行すると、`.github/workflows/` 以下のワークフローファイルがまとめて書き換わる。

```bash
pinact run
```

#### 変換前

```yaml
uses: actions/checkout@v7.0.0
```

#### 変換後

```yaml
uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0
```

