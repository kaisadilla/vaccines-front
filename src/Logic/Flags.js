import Andalucia    from "../img/0-andalucia.png";
import Aragon       from "../img/1-aragon.png";
import Asturias     from "../img/2-asturias.png";
import Balears      from "../img/3-illes-balears.png";
import Canarias     from "../img/4-islas-canarias.png";
import Cantabria    from "../img/5-cantabria.png";
import CLeon        from "../img/6-castilla-y-leon.png";
import CLaMancha    from "../img/7-castilla-la-mancha.png";
import Catalunya    from "../img/8-catalunya.png";
import Valencia     from "../img/9-c-valenciana.png";
import Extremadura  from "../img/10-extremadura.png";
import Galiza       from "../img/11-galiza.png";
import Rioja        from "../img/12-la-rioja.png";
import Madrid       from "../img/13-c-madrid.png";
import Murcia       from "../img/14-murcia.png";
import Nafarroa     from "../img/15-nafarroa.png";
import EuskalHerria from "../img/16-euskal-herria.png";
import Ceuta        from "../img/17-ceuta.png";
import Melilla      from "../img/18-melilla.png";
import Spain        from "../img/spain.png";

class Flags {
    static getFlag (id) {
        switch (id) {
            case 1 : return Andalucia;
            case 2 : return Aragon;
            case 3 : return Asturias;
            case 4 : return Balears;
            case 5 : return Canarias;
            case 6 : return Cantabria;
            case 7 : return CLeon;
            case 8 : return CLaMancha;
            case 9 : return Catalunya;
            case 10: return Valencia;
            case 11: return Extremadura;
            case 12: return Galiza;
            case 13: return Rioja;
            case 14: return Madrid;
            case 15: return Murcia;
            case 16: return Nafarroa;
            case 17: return EuskalHerria;
            case 18: return Ceuta;
            case 19: return Melilla;
            default: return Spain;
        }
    }
}

export default Flags;