### Realm Device Sync with NodeJS

Get start your Realm device sync with NodeJS. The NodeJS SDK it's a script based porgramming and it's simplify your development. To run your NodeJS you don't need to compile your application, make it roboust for faster prototyping and testing.

This application build on <code>npm version 10.1.0</code> and <code>node version 20.7.0</code>

This sample app will demonstrate how the realm device sync permission and encryption works.

To simulate write into object please use [Realm studio](https://www.mongodb.com/docs/realm/studio/install/).

#### Create a free cluster on Atlas

1. Please find the [instruction here](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
2. Create new application under app services
   ![createapp-new](/assets/createapp-new.png)
3. Make sure link your datasource to active cluster - free version is fine
4. Popuplate your database with <code>customuserdata -> customerdata.json</code> and <code>database with existing as collection name -> existing.json</code> file can be found on monogodbdata
5. Create a user on App Services
   ![create-user](/assets/create-user.png)
6. Setup the Rule permission. Click rule and select the realmdata database and existing collection. Use advance and copy past <code>rule.json</code> !
   ![rule2](/assets/rule2.png)
7. Turn on role as query-able field
8. Enable the device sync
   ![enablesync](/assets/enablesync.png)

##### Get start

1. Make sure that you have <b>NodeJS</b> and <b>npm</b> installed on your computer. The easiest for windows use [chocolatey](https://chocolatey.org/) and mac use [homebrew](https://brew.sh/)
2. To check your system please run npm --version and node --version
3. Clone the repository

```shell
git clone https://github.com/hendritjipto/realm-getstart
```

4. Run the npm init and npm install

```shell
npm init
npm install
```

5. Change the app-id to your newly create app-id
   ![changeappid](/assets/changeappid_mhfezuh1w.png)

#### Run as normal user

This will allow user to open certain document and have read-only permission

1. Run the <code>loginuser.js</code> to test device sync
2. A folder mongodb-realm will be created
3. Realm database will be inside <code>userid</code> folder
4. Open <code>flx_sync_default.realm</code> realm database with [Realm studio](https://www.mongodb.com/docs/realm/studio/install/)

#### Run as manager user

This will allow user to all document and have read and write permission

1. Run the <code>loginmanager.js</code> to test device sync
2. A folder mongodb-realm will be created
3. Realm database will be inside <code>userid</code> folder
4. Open <code>flx_sync_default.realm</code> realm database with [Realm studio](https://www.mongodb.com/docs/realm/studio/install/)

#### Run as encryted user realm

This will encrypt your realm database and have user permission

1. When running the <code>loginencrypt.js</code>
2. Copy this key <code>01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101</code>
3. A folder mongodb-realm will be created
4. Realm database will be inside <code>userid</code> folder
5. Open <code>flx_sync_default.realm</code> realm database with [Realm studio](https://www.mongodb.com/docs/realm/studio/install/)
6. Paste the key when [Realm studio](https://www.mongodb.com/docs/realm/studio/install/) ask for the key
7. The realm database will open
