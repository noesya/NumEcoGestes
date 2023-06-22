export default class Ecogeste {
    constructor ({ titles, thanks, description, sources, tag, points, credit, collectiveEffort, hasPicture }) {
        this.titles = titles;
        this.thanks = thanks;
        this.description = description;
        this.sources = sources;
        this.tag = tag;
        this.points = points;
        this.credit = credit;
        this.collectiveEffort = collectiveEffort;
        this.hasPicture = hasPicture || false;
        this.affected = true;
    }

    randomTitle () {
        const randomIndex = Math.floor(Math.random() * this.titles.length);
        return this.titles[randomIndex];
    }
}