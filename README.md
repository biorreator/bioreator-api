# Instalação

Segue abaixo os passos de instalação para rodar a API nos seguintes Sistemas Operacionais:

## MACOS

Instalar o gerenciador de dependencias 'yarn' nos dois possíveis gerenciadores de pacotes:
```
brew install yarn
```
ou
```
sudo port install yarn
```

Agora instalar o banco de dados utilizado 'rethinkdb':
```
brew install rethinkdb
```

## Linux

Para instalar o gerenciador de dependencias 'yarn':
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

# Rodando a API

Primeiro instalar as dependecias do projeto:
```
yarn
```
Em uma aba na pasta RAÍZ abra a conexão com o banco de dados rodando:
```
rethinkdb
```
E em outra aba na pasta RAÍZ rode o servidor da API com: 
```
yarn run dev
```
