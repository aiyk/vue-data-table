import { initializeApp, database } from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyD4hIwv30kuyJHUKHyJE2br2zKg_Mz-Clk",
    authDomain: "vue-data-table.firebaseapp.com",
    databaseURL: "https://vue-data-table.firebaseio.com",
    projectId: "vue-data-table",
    storageBucket: "vue-data-table.appspot.com",
    messagingSenderId: "354690062898"
};

initializeApp(config);

export default {
    database: database()
} 