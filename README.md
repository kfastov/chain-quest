## Requirements
- Node v22.9.0
- NPM 10.8.3
- PostgreSQL Latest.
- Bun.
- Wallet Account(Argentx or Braavos).

## Setup Instruction.
1. Clone the Repository.
```
git clone https://github.com/kfastov/chain-quest.git
cd chain-quest
```

## Backend.
Install [PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/).
```bash
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt update
sudo apt -y install postgresql
```

Configuring the PostgreSQL.
1. Switch to Postgres user.
```bash
sudo -i -u postgres
```
2. Create a database. Replace _mydatabase_ with the name you want to give to your database.
```bash
createdb mydatabase
```
3. Connect to the database by replacing mydatabase by the database name you have created.
```bash
psql -d mydatabase
```
4. `\conninfo` To get the information about the current database connection such as the connected database, user, host and port. Note the port number.
5. `\password postgres` To set/change the passowrd of the postgres user.
6. `\q` To disconnect from the database.
7. `exit` To logout/exit of the postgres user.

Instialize the database using Prisma. A new folder called _prisma_ in which _prisma.schema_ will be created.
Environment Variable _.env_ file will also get created.
```bash
npx prisma init --datasource-provider postgresql 
```
In _prisma.schema_ file add the following code.
'''bash
model User {
  id    Int    @id @default(autoincrement())
  email String
  name  String
}
'''
In .env file replace _johndoe_ with postgres, _randowpassword_ with the password you created for the postgres user and _mydb_ with the database you created.

Sync the database with your schema and generate the Prisma Client.
```bash
npx prisma migrate dev --name init
```

## Frontend
Install the Node Package Manager. You will require curl to install.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```
Run `source ~/.bashrc` to reload the configuration.
Verify by executing `nvm --v`.

Install Node.js.
```bash
nvm install node
```
Verify by executing `node -v` and `npm -v`.

Install the dependencies related to the project. Note: You should be in the project folder, i.e., chain-quest.
```bash
npm install
```

Install [Bun](https://bun.sh/).
_unzip_ is required to install Bun
```bash
sudo apt install unzip
curl -fsSL https://bun.sh/install | bash
```
Run `source ~/.bashrc` to reload the configuration.
Verify by executing `bun -v`.

Add the following code .env file. You will require a wallet account such as ArgentX or Braavos.
- Replace _<Private Key>_ with the wallets private key and _<Address>_ with the wallets address.
- Based on Mainnet or Testnet or Devnet add the enpoint. Below Sepolia testnet RPC Endpoint is added.
```bash
DEPLOYER_PRIVATE_KEY=<Private Key>
DEPLOYER_ADDRESS=<Address>
RPC_ENDPOINT=https://starknet-sepolia.public.blastapi.io/
```

Start the backend server.
```bash
bun server
```

Open another terminal run the development server:
```bash
npm run dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
