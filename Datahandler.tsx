import moment, { Moment } from "moment";
import { auth, app, db, getFirestore, doc, setDoc, getDoc } from "./firebase/config.js";

// MARK: - Types.
export type Page = {
    id: string;
    text: string;
    image: string;
};

export type Stat = {
    id: string;
    strength: number;
}

export type Goal = {
    id: string;
    completed: boolean;
}

// MARK: - Private methods.
const getCloudData = async (key: string) => {
    try {
        const docRef = doc(db, key, auth.currentUser!.email!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            console.log("No such document.");
        }
    } catch (e) {
        console.log(e)
    }
}

const getPublicCloudData = async (key: string) => {
    try {
        const docRef = doc(db, key, "public");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            console.log("No such document.");
        }
    } catch (e) {
        console.log(e)
    }
}

const storeCloudData = async (key: string, value: any) => {
    try {
        const docRef = await setDoc(doc(db, key, auth.currentUser!.email!), {
            data: value
        });
    } catch (e) {
        console.log(e);
    }
}

var stats: Stat[] = [];
var pages: Page[] = [];
var moods: {} = {};
var diaries: {} = {};
var importantUrgentGoals: {} = {};
var importantNotUrgentGoals: {} = {};
var notImportantUrgentGoals: {} = {};
var notImportantNotUrgentGoals: {} = {};

export default {
    setStats(newStats: Stat[]) {
        stats = newStats
        storeCloudData("stats", stats)
    },
    async loadStats() {
        var cloud_stats = await getCloudData("stats")
        stats = cloud_stats
        return stats
    },
    getStats(): Stat[] {
        if (stats === undefined) {
            stats = []
        }
        return stats
    },
    setMoods(newMoods: any) {
        moods = newMoods
        storeCloudData("moods", moods)
    },
    async loadMoods() {
        var cloud_moods = await getCloudData("moods")
        moods = cloud_moods
        return moods
    },
    getMoods(): any {
        if (moods === undefined) {
            moods = {}
        }
        return moods
    },
    setDiary(day: number, text: string) {
        diaries[day] = text
        storeCloudData("diaries", diaries)
    },
    async loadDiaries() {
        diaries = await getCloudData("diaries")
        if (diaries === undefined) {
            diaries = {}
        }
        return diaries
    },
    getDiary(day: number) {
        return diaries[day] ?? ""
    },
    setImportantUrgentGoals(day: number, goals: Goal[]) {
        importantUrgentGoals[day] = goals
        storeCloudData("importantUrgentGoals", importantUrgentGoals)
    },
    setImportantNotUrgentGoals(day: number, goals: Goal[]) {
        importantNotUrgentGoals[day] = goals
        storeCloudData("importantNotUrgentGoals", importantNotUrgentGoals)
    },
    setNotImportantUrgentGoals(day: number, goals: Goal[]) {
        notImportantUrgentGoals[day] = goals
        storeCloudData("notImportantUrgentGoals", notImportantUrgentGoals)
    },
    setNotImportantNotUrgentGoals(day: number, goals: Goal[]) {
        notImportantNotUrgentGoals[day] = goals
        storeCloudData("notImportantNotUrgentGoals", notImportantNotUrgentGoals)
    },
    getImportantUrgentGoals(day: number) {
        return importantUrgentGoals[day] ?? []
    },
    getImportantNotUrgentGoals(day: number) {
        return importantNotUrgentGoals[day] ?? []
    },
    getNotImportantUrgentGoals(day: number) {
        return notImportantUrgentGoals[day] ?? []
    },
    getNotImportantNotUrgentGoals(day: number) {
        return notImportantNotUrgentGoals[day] ?? []
    },
    async loadImportantUrgentGoals(day: number) {
        importantUrgentGoals = await getCloudData("importantUrgentGoals")
        if (importantUrgentGoals === undefined) {
            importantUrgentGoals = {}
        }
        return importantUrgentGoals[day] ?? []
    },
    async loadImportantNotUrgentGoals(day: number) {
        importantNotUrgentGoals = await getCloudData("importantNotUrgentGoals")
        if (importantNotUrgentGoals === undefined) {
            importantNotUrgentGoals = {}
        }
        return importantNotUrgentGoals[day] ?? []
    },
    async loadNotImportantUrgentGoals(day: number) {
        notImportantUrgentGoals = await getCloudData("notImportantUrgentGoals")
        if (notImportantUrgentGoals === undefined) {
            notImportantUrgentGoals = {}
        }
        return notImportantUrgentGoals[day] ?? []
    },
    async loadNotImportantNotUrgentGoals(day: number) {
        notImportantNotUrgentGoals = await getCloudData("notImportantNotUrgentGoals")
        if (notImportantNotUrgentGoals === undefined) {
            notImportantNotUrgentGoals = {}
        }
        return notImportantNotUrgentGoals[day] ?? []
    },
    async loadPages() {
        var cloud_pages = await getPublicCloudData("articles")
        pages = cloud_pages
        return pages
    },
    getPages(): Page[] {
        if (pages == undefined) {
            pages = []
        }
        return pages
    },
    daysFromStart(date: Moment): number {
        var start: Moment = moment([2007, 1, 1]);
        return date.diff(start, 'days')
    }
};
