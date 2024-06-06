// services/sqlite.js
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({ name: 'data.db', location: 'default' });

 const createUsersTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, phoneNumber TEXT, age INTEGER , name TEXT);'
    );
  });
};

const addUser = (id, phoneNumber, age , name) => {
db.transaction(tx => {
  tx.executeSql(
    'INSERT INTO users (id, phoneNumber, age , name) VALUES (?, ?, ? , ? )',
    [id, phoneNumber, age , name],
    (_, {insertId}) => {
    },
    error => {
      console.error('Error adding user:', error);
    }
  );
});
};
  const showUsers = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (_, {rows}) => {
        const users = rows.raw();
      });
    });
  };
   const showUserById = (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE id = ?',
          [userId],
          (tx, results) => {
            if (results.rows.length > 0) {
              resolve(results.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };

   const updateUserById = (userId, userData) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE users SET age = ?, name = ?, phoneNumber = ? WHERE id = ?',
          [userData.age, userData.name, userData.phoneNumber, userId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };

  const deleteUserById = async (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM users WHERE id = ?',
          [userId],
          (_, resultSet) => {
            resolve(resultSet.rowsAffected);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

export {  addUser , showUsers ,showUserById , createUsersTable , updateUserById , deleteUserById };
