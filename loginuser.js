import Realm, {
    ClientResetMode,
    ConnectionState,
    Credentials,
    SyncError,
    UserState,
} from "realm";

import fs from "fs"

// Initialize your App.
const app = new Realm.App({ id: "xxxx" });

// Authenticate an anonymous user.
const anonymousUser = await app.logIn(Realm.Credentials.
    emailPassword("user@mongodb.com", "xxxx"));

console.log(anonymousUser.id);
console.log(anonymousUser.profile.email);
console.log(anonymousUser.customData);
console.log(anonymousUser.customData.role);
console.log("Access token : " + anonymousUser.accessToken.substring(0, 50) + "....");
console.log("Refresh token : " + anonymousUser.refreshToken.substring(0, 50) + "....");

export const logger = {
    info(message) {
        console.info(new Date().toLocaleString(), '| INFO |', message);
    },
    error(message) {
        console.error(new Date().toLocaleString(), '| ERROR |', message);
    },
};

const handleSyncError = async (session, error) => {
    if (error.code !== undefined) {
        if (error.code >= 100 && error.code < 200) {
            logger.error(`Connection level and protocol error: ${error.message}. ${JSON.stringify(error)}`);
        } else if (error.code >= 200 && error.code < 300) {
            logger.error(`Session level error: ${error.message}. ${JSON.stringify(error)}`);
        } else {
            // Should not be reachable.
            logger.error(`Unexpected error code: ${error.code}. ${JSON.stringify(error)}`);
            if (error.name == "ClientReset") {
                const realmPath = realm.path;
                realm.close();
                Realm.App.Sync.initiateClientReset(app, realmPath);
                realm = await Realm.open(config);

                fs.unlink(error.config.path, (err) => {
                    if (err) {
                        logger.info('Error deleting file:', err);
                    } else {
                        logger.error('File deleted successfully.');
                    }
                });
            }
        }
    }
}

function handlePreClientReset(localRealm) {
    logger.info("Initiating client reset...");
}

function handlePostClientReset(localRealm, remoteRealm) {
    logger.info("Client has been reset.");
}

export class existing extends Realm.Object {
    static schema = {
        name: 'existing',
        properties: {
            _id: 'objectId?',
            age: 'int?',
            insurance_type: 'string?',
            name: 'string?',
            premium: 'int?',
            role: 'string?',
        },
        primaryKey: '_id',
    };
}

Realm.setLogLevel("info");

const config = {
    schema: [existing],
    sync: {
        // Use the previously-authenticated anonymous user.
        user: anonymousUser,
        // Set flexible sync to true to enable sync.
        flexible: true,
        initialSubscriptions: {
            update: (subs, realm) => {
                subs.add(
                    // Get objects that match your object model, then filter them by
                    // the `owner_id` queryable field
                    realm.objects(existing).filtered(`role == "${anonymousUser.customData.role}"`), {
                    name: "Just get data belong to role",
                });
            },
            rerunOnOpen: true,
        },
        // The old property for the error callback was called `error`, please use `onError`.
        onError: handleSyncError,
    }
};
var realm = await Realm.open(config);

const subscriptions = realm.subscriptions;

for (const subscription of subscriptions) {
    console.log(subscription);
}