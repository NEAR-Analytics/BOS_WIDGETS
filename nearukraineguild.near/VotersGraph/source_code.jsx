const data = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_election_votes.txt"
);

const [voters, setVoters] = useState(null);
const [selectedAccountId, setSelectedAccountId] = useState(context.accountId);
const debug = false;

// useEffect(() => {
//   if (!data.ok) {
//     return;
//   }
//   const voters = {};
//   Object.values(
//     data.body
//       .split("\n")
//       .map((line) => line.split("|"))
//       .filter((data) => data.length === 5)
//   ).forEach((item, i) => {
//     if (debug && i > 50) {
//       return;
//     }
//     const account_id = item[0];
//     if (voters[account_id] == undefined) {
//       voters[account_id] = {};
//     }
//     voters[account_id][item[3]] = item[4].toLowerCase();
//   });
//   setVoters(voters);
// }, [data]);

const nullified = {
  "magdalena55.near": {
    1: '["alan777.near", "fritzwagner.near", "luciotato.near", "kemo.near", "derymars.near", "vadim.near"]',
    2: '["vianftbrasil.near", "mattlock.near", "jloc.near", "marieke.near", "izcc.near", "as.near"]',
    3: '["vikash.near", "rahulgoel.near", "williamxx.near", "ramgor.near", "kriptoraptor.near", "yourdad.near", "crans.near"]',
  },
  "fritzwagner.near": {
    1: '["fritzwagner.near", "alan777.near", "luciotato.near", "kemo.near"]',
    2: '["izcc.near", "marieke.near", "mattlock.near", "jloc.near", "vianftbrasil.near", "harveys.near"]',
    3: '["ramgor.near", "rahulgoel.near", "izubair.near", "kriptoraptor.near", "vikash.near", "williamxx.near", "yourdad.near"]',
  },
  "kayc.near": {
    1: '["psalm.near", "davidweinstein.near", "igboze_builder.near", "dk_51.near"]',
    2: '["alphaflexhub.near", "flame1.near", "kennethjay.near", "as.near"]',
    3: '["blessedchidi.near", "dabbie3229.near"]',
  },
  "kbounce.near": {
    1: '["louisliu.near"]',
    2: '["alphaflexhub.near", "harveys.near"]',
    3: '["cryptois.near", "mohaa.near", "dabbie3229.near"]',
  },
  "kriszeldome.near": {
    1: '["vlad.near", "denbite.near", "kekiboh.near", "vadim.near", "mob.near", "lolson.near", "kiskesis.near", "whendacha.near", "davletuner.near", "maxkott.near", "haenko.near", "masterofcode.near", "auroracfo.near", "kelsontoh.near", "nguyencuong.near"]',
    2: '["techdir.near", "iamanansari.near", "frol.near", "kennethjay.near", "duocelot.near", "rubycop.near", "evangel.near"]',
    3: '["izubair.near", "johanga108.near", "moska.near", "yonota.near", "sallymg.near", "kriptoraptor.near", "maks1mk_a.near"]',
  },
  "669109376e466c6c862fbdcfcc9e73562fa893482aae27ce709d0f8d811dd511": {
    1: '["louisliu.near"]',
    2: '["kennethjay.near"]',
    3: '["cryptois.near"]',
  },
  "suzan688.near": {
    1: '["louisliu.near"]',
    2: '["flame1.near"]',
    3: '["cryptois.near", "dabbie3229.near"]',
  },
  "paulp6000.near": {
    1: '["louisliu.near"]',
    2: '["flame1.near"]',
    3: '["cryptois.near"]',
  },
  "gainchampagne.near": {
    1: '["iamgalt.near", "maxkott.near", "salikc9.near", "nguyencuong.near", "guaschingmachines.near", "p3ter.near", "cryptocredit.near", "psalm.near", "lolson.near", "sahilmassey.near", "tiffany.near", "wizzow.near", "vandal.near", "tutmt.near", "eschnoeckel.near"]',
    2: '["kumarkrsronit.near", "techdir.near", "bishi.near", "antmarshall360.near", "harveys.near", "yesn.near", "jlw.near"]',
    3: '["dabbie3229.near", "crans.near", "larkim.near", "christinas.near", "andersonr.near", "johanga108.near", "escobarindo.near"]',
  },
  "vicj2000.near": {
    1: '["louisliu.near"]',
    3: '["dabbie3229.near", "cryptois.near"]',
  },
  "gfwn.near": {
    1: '["fritzwagner.near", "derymars.near", "rileytran.near", "alan777.near", "cryptocredit.near", "vlad.near", "luciotato.near", "kemo.near", "monish016.near"]',
    2: '["mattlock.near", "kwhyc.near", "izcc.near", "harveys.near", "marieke.near", "vianftbrasil.near", "jloc.near"]',
    3: '["ramgor.near", "vikash.near", "rahulgoel.near", "kriptoraptor.near", "crans.near", "izubair.near"]',
  },
  "skarlygarcia.near": {
    1: '["derymars.near", "kemo.near", "alan777.near", "luciotato.near", "fritzwagner.near", "klint.near"]',
    2: '["izcc.near", "mattlock.near", "marieke.near", "vianftbrasil.near", "harveys.near", "jloc.near", "kwhyc.near"]',
    3: '["kriptoraptor.near", "rahulgoel.near", "ramgor.near", "izubair.near", "vikash.near", "alejandro.near", "williamxx.near"]',
  },
  "anthonyrod.near": {
    1: '["louisliu.near"]',
    2: '["keyokey.near"]',
    3: '["cryptois.near", "dabbie3229.near"]',
  },
  "richardregorio.near": {
    1: '["luciotato.near", "kemo.near", "fritzwagner.near", "derymars.near", "alan777.near", "frado.near", "whendacha.near", "monish016.near"]',
    2: '["izcc.near", "mattlock.near", "kwhyc.near", "vianftbrasil.near", "jloc.near", "marieke.near", "harveys.near"]',
    3: '["williamxx.near", "rahulgoel.near", "vikash.near", "ramgor.near", "kriptoraptor.near", "yourdad.near", "alejandro.near"]',
  },
  "ramonfarfan.near": {
    1: '["klint.near", "luciotato.near", "alan777.near", "whendacha.near", "kemo.near", "fritzwagner.near", "derymars.near", "igboze_builder.near"]',
    2: '["izcc.near", "harveys.near", "as.near", "mattlock.near", "marieke.near", "jloc.near", "kwhyc.near"]',
    3: '["ramgor.near", "williamxx.near", "vikash.near", "kriptoraptor.near", "izubair.near", "rahulgoel.near"]',
  },
  "fucklove.near": {
    1: '["masterofcode.near", "haenko.near", "vlad.near", "rexux.near", "vadim.near", "maxkott.near", "kiskesis.near", "davletuner.near", "lolson.near", "dk_51.near", "mob.near", "whendacha.near", "denbite.near", "auroracfo.near", "kelsontoh.near"]',
    2: '["iamanansari.near", "as.near", "evangel.near", "bishi.near", "rubycop.near", "jloc.near", "keyokey.near"]',
    3: '["johanga108.near", "moska.near", "izubair.near", "yourdad.near", "yonota.near"]',
  },
  "magnetize.near": {
    1: '["denbite.near", "maxkott.near", "auroracfo.near", "dk_51.near", "whendacha.near", "davletuner.near", "masterofcode.near", "vadim.near", "vlad.near", "kiskesis.near", "lolson.near", "mob.near", "haenko.near", "rexux.near", "klint.near"]',
    2: '["rubycop.near", "techdir.near", "iamanansari.near", "as.near", "evangel.near", "vianftbrasil.near", "yesn.near"]',
    3: '["yonota.near", "johanga108.near", "moska.near", "yourdad.near", "izubair.near"]',
  },
  "balgowan.near": {
    1: '["cameron.near", "web3hedge.near", "haenko.near"]',
    2: '["ndcplug.near", "mattlock.near", "blaze.near"]',
    3: '["alejandro.near", "rektdegen.near"]',
  },
  "silasharuna12.near": {
    1: '["louisliu.near"]',
    2: '["sammiee1.near"]',
    3: '["cryptois.near", "dabbie3229.near"]',
  },
  "henryb98.near": {
    1: '["louisliu.near"]',
    2: '["antmarshall360.near"]',
    3: '["cryptois.near"]',
  },
  "janejav18.near": {
    1: '["whendacha.near", "auroracfo.near", "denbite.near", "kiskesis.near", "haenko.near", "lolson.near", "maxkott.near", "davletuner.near", "rexux.near", "mob.near", "vlad.near"]',
    2: '["evangel.near", "ilerik.near", "iamanansari.near", "rubycop.near", "ahsas.near"]',
    3: '["yourdad.near", "izubair.near", "moska.near", "yonota.near"]',
  },
  "nearityorg.near": {
    1: '["vadim.near", "kiskesis.near", "haenko.near", "whendacha.near", "maxkott.near", "lolson.near", "dk_51.near", "vlad.near", "davletuner.near", "mob.near", "auroracfo.near", "denbite.near", "masterofcode.near", "web3hedge.near", "rexux.near"]',
    2: '["frol.near", "ahsas.near", "rubycop.near", "iamanansari.near", "evangel.near", "techdir.near", "as.near"]',
    3: '["rahulgoel.near", "moska.near", "tolmindev.near", "izubair.near", "yourdad.near", "johanga108.near", "yonota.near"]',
  },
  "ntrucchinh.near": {
    1: '["louisliu.near", "ogruss.near", "ntrucchinh.near", "haenko.near", "derymars.near", "dk_51.near", "whendacha.near", "cryptocredit.near", "kiskesis.near", "tutmt.near", "vlad.near", "mob.near", "maxkott.near", "rexux.near", "vandal.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "ahsas.near", "as.near", "frol.near"]',
    3: '["tolmindev.near", "johanga108.near", "yonota.near", "izubair.near", "rahulgoel.near", "yourdad.near", "moska.near"]',
  },
  "charissec.near": {
    1: '["louisliu.near"]',
    2: '["reespect.near"]',
    3: '["dabbie3229.near", "cryptois.near"]',
  },
  "anniejhoy02.near": {
    1: '["louisliu.near"]',
    2: '["reespect.near"]',
    3: '["cryptois.near", "dabbie3229.near"]',
  },
  "arnarnie.near": {
    1: '["louisliu.near"]',
    2: '["reespect.near"]',
    3: '["cryptois.near", "dabbie3229.near"]',
  },
  "moskalenko.near": {
    1: '["rexux.near", "vadim.near", "masterofcode.near", "davletuner.near", "web3hedge.near", "mob.near", "denbite.near", "whendacha.near", "kiskesis.near", "dk_51.near", "lolson.near", "haenko.near", "maxkott.near", "vlad.near", "auroracfo.near"]',
    2: '["evangel.near", "as.near", "techdir.near", "rubycop.near", "iamanansari.near", "frol.near", "bishi.near"]',
    3: '["izubair.near", "yonota.near", "rahulgoel.near", "yourdad.near", "tolmindev.near", "johanga108.near", "moska.near"]',
  },
  "zigang.near": {
    1: '["web3hedge.near"]',
    2: '["frol.near", "ndcplug.near", "blaze.near", "joespano.near", "mattlock.near", "chefsale.near", "bennyblanco.near"]',
    3: '["rektdegen.near"]',
  },
  "stevekok.near": {
    1: '["kelsontoh.near", "dleer.near", "rileytran.near", "web3hedge.near", "vlad.near", "vandal.near", "tiffany.near", "mob.near", "vadim.near", "cameron.near", "fritzwagner.near", "haenko.near", "psalm.near", "kemo.near", "frado.near"]',
    2: '["frol.near", "ndcplug.near", "blaze.near", "joespano.near", "mattlock.near", "chefsale.near", "bennyblanco.near"]',
    3: '["rektdegen.near", "alejandro.near", "pironi.near", "jarednotjerry.near", "escobarindo.near", "yourdad.near", "crans.near"]',
  },
  "sanaik.near": {
    1: '["louisliu.near"]',
    2: '["as.near"]',
    3: '["cryptois.near", "dabbie3229.near"]',
  },
  "windturne.near": {
    1: '["fritzwagner.near", "rileytran.near", "tiffany.near", "vadim.near", "vlad.near", "cameron.near", "mob.near", "web3hedge.near", "haenko.near", "kelsontoh.near", "vandal.near", "dleer.near"]',
    2: '["joespano.near", "mattlock.near", "blaze.near", "ndcplug.near", "frol.near", "chefsale.near", "bennyblanco.near"]',
    3: '["alejandro.near", "yourdad.near", "escobarindo.near", "crans.near", "jarednotjerry.near", "rektdegen.near", "pironi.near"]',
  },
  "rektdegen.near": {
    1: '["rileytran.near", "odins_eyehole.near", "luciotato.near", "woben.near", "kelsontoh.near", "berynteoh.near", "cameron.near", "vlad.near", "web3hedge.near", "dleer.near", "mob.near", "vadim.near", "haenko.near", "gcohen.near", "vandal.near"]',
    2: '["mattlock.near", "bennyblanco.near", "kangaroojack.near", "ndcplug.near", "frol.near", "blaze.near", "joespano.near"]',
    3: '["rektdegen.near", "pironi.near", "danieldao.near", "alejandro.near", "escobarindo.near", "jarednotjerry.near", "cryptois.near"]',
  },
  "nearpiapauleee.near": {
    1: '["louisliu.near"]',
    2: '["harveys.near", "keyokey.near", "bishi.near", "bennyblanco.near", "mattlock.near", "kwhyc.near", "reespect.near"]',
    3: '["cryptois.near"]',
  },
  "web3hedge.near": {
    1: '["fritzwagner.near", "luciotato.near", "vandal.near", "ogruss.near", "p3ter.near", "web3hedge.near", "dleer.near", "vadim.near", "kelsontoh.near", "cameron.near", "tiffany.near", "haenko.near", "odins_eyehole.near", "mob.near", "vlad.near"]',
    2: '["chefsale.near", "blaze.near", "bennyblanco.near", "achildhoodhero.near", "ndcplug.near", "mattlock.near", "joespano.near"]',
    3: '["pironi.near", "crans.near", "rektdegen.near", "alejandro.near", "escobarindo.near", "jarednotjerry.near", "yourdad.near"]',
  },
  "damboy22.near": {
    1: '["psalm.near", "louisliu.near"]',
    2: '["jgold.near"]',
    3: '["dabbie3229.near", "cryptois.near"]',
  },
  "ayawari.near": {
    1: '["louisliu.near"]',
    2: '["jgold.near"]',
    3: '["cryptois.near"]',
  },
  "9fa2c7aea41f9a26694dfcaf03c61e4c1b315862b94658814d875b6f5d6cc935": {
    3: '["rektdegen.near", "alejandro.near", "pironi.near", "jarednotjerry.near", "escobarindo.near", "cryptois.near", "waverlymaven.near"]',
  },
  "tibyparedes2.near": {
    1: '["derymars.near", "fritzwagner.near", "kemo.near", "alan777.near", "luciotato.near"]',
    2: '["izcc.near", "marieke.near", "jloc.near", "mattlock.near", "harveys.near", "kwhyc.near", "vianftbrasil.near"]',
    3: '["kriptoraptor.near", "ramgor.near", "williamxx.near", "rahulgoel.near", "vikash.near", "izubair.near"]',
  },
  "gerardosantana.near": {
    1: '["kemo.near", "frado.near", "fritzwagner.near", "alan777.near", "luciotato.near", "derymars.near"]',
    2: '["kwhyc.near", "izcc.near", "jloc.near", "mattlock.near", "vianftbrasil.near", "harveys.near", "marieke.near"]',
    3: '["vikash.near", "kriptoraptor.near", "williamxx.near", "yourdad.near", "rahulgoel.near", "ramgor.near", "izubair.near"]',
  },
  "rodobossa.near": {
    1: '["frado.near", "fritzwagner.near", "luciotato.near"]',
    2: '["marieke.near", "ahsas.near", "mattlock.near"]',
    3: '["vikash.near", "ramgor.near", "andersonr.near"]',
  },
  "ivypaco.near": {
    1: '["whendacha.near", "haenko.near", "rexux.near", "denbite.near", "kiskesis.near", "auroracfo.near", "lolson.near", "maxkott.near", "vadim.near", "mob.near", "dk_51.near", "vlad.near", "davletuner.near", "eschnoeckel.near", "achoski.near"]',
    2: '["evangel.near", "blaze.near", "techdir.near", "rubycop.near", "ahsas.near", "iamanansari.near"]',
    3: '["rahulgoel.near", "moska.near", "johanga108.near", "yonota.near", "yourdad.near"]',
  },
  "jloc.near": {
    1: '["kemo.near", "alan777.near", "fritzwagner.near", "luciotato.near", "frado.near"]',
    2: '["izcc.near", "jloc.near", "vianftbrasil.near", "harveys.near"]',
    3: '["rahulgoel.near", "kriptoraptor.near", "ramgor.near", "andersonr.near", "vikash.near"]',
  },
  "njrams.near": {
    1: '["fritzwagner.near"]',
    2: '["jloc.near"]',
    3: '["ramgor.near"]',
  },
  "franyerblas22.near": {
    1: '["luciotato.near", "cryptocredit.near", "whendacha.near", "fritzwagner.near", "dk_51.near", "alan777.near", "psalm.near"]',
    2: '["jloc.near", "mattlock.near", "marieke.near", "ahsas.near", "harveys.near"]',
    3: '["ramgor.near", "vikash.near", "williamxx.near", "johanga108.near"]',
  },
  "leominor.near": {
    1: '["ugxnear.near", "sahilmassey.near", "bearmans.near", "eschnoeckel.near", "wizzow.near", "vandal.near", "berynteoh.near", "frado.near", "guaschingmachines.near", "achoski.near", "ntrucchinh.near", "monish016.near", "kelsontoh.near", "salikc9.near", "tiffany.near"]',
    2: '["harveys.near", "kwhyc.near", "jgold.near", "marieke.near", "ndcplug.near", "reespect.near", "sammiee1.near"]',
    3: '["larkim.near", "nftmuse.near", "crans.near", "manutegus.near", "williamxx.near", "mohaa.near", "abdulkareem.near"]',
  },
  "028521fdcdb25436d59ca93155651d613b6d0312010fea8f69d1fbebeeb91b15": {
    1: '["dk_51.near", "rexux.near", "kiskesis.near", "alan777.near", "luciotato.near", "igboze_builder.near", "fritzwagner.near", "klint.near", "frado.near", "mob.near", "vlad.near", "psalm.near", "bearmans.near", "salikc9.near", "kemo.near"]',
    2: '["evangel.near", "as.near", "duocelot.near", "vianftbrasil.near", "iamanansari.near", "izcc.near", "alphaflexhub.near"]',
    3: '["andersonr.near", "izubair.near", "johanga108.near", "alejandro.near", "mohaa.near", "yourdad.near", "vikash.near"]',
  },
  "criptobirra.near": {
    1: '["chloe.near", "derymars.near", "luciotato.near", "kemo.near", "alan777.near", "monish016.near", "klint.near", "cryptocredit.near", "fritzwagner.near", "whendacha.near", "igboze_builder.near", "vlad.near", "vadim.near"]',
    2: '["marieke.near", "izcc.near", "vianftbrasil.near", "mattlock.near", "harveys.near", "kwhyc.near", "jloc.near"]',
    3: '["ramgor.near", "yourdad.near", "kriptoraptor.near", "crans.near", "vikash.near", "williamxx.near", "rahulgoel.near"]',
  },
  "curuba.near": {
    1: '["luciotato.near", "kemo.near", "derymars.near", "alan777.near", "fritzwagner.near", "chloe.near", "vlad.near", "vandal.near"]',
    2: '["kwhyc.near", "jloc.near", "mattlock.near", "harveys.near", "izcc.near", "marieke.near", "vianftbrasil.near"]',
    3: '["yourdad.near", "ramgor.near", "rahulgoel.near", "williamxx.near", "vikash.near", "crans.near"]',
  },
  "oglabs.near": { 1: '["louisliu.near"]' },
  "jasmine9m.near": { 1: '["louisliu.near"]' },
  "npcleo.near": { 1: '["louisliu.near"]' },
  acc2e007d85780bfa26d6adca9ba52fa5a11f1d7f245fb0e5f8d3d4e8e367f26: {
    1: '["vlad.near", "dk_51.near", "whendacha.near", "maxkott.near", "haenko.near", "kiskesis.near", "auroracfo.near", "rexux.near", "rileytran.near", "vadim.near", "masterofcode.near", "woben.near", "denbite.near", "davletuner.near", "mob.near"]',
    2: '["evangel.near", "as.near", "flame1.near", "techdir.near", "iamanansari.near", "kumarkrsronit.near", "rubycop.near"]',
    3: '["izubair.near", "tolmindev.near", "moska.near", "johanga108.near", "rahulgoel.near", "yourdad.near", "yonota.near"]',
  },
  "morwal.near": {
    1: '["whendacha.near", "dk_51.near", "vadim.near", "psalm.near", "rexux.near"]',
    2: '["flame1.near", "iamanansari.near", "as.near", "kumarkrsronit.near"]',
    3: '["izubair.near", "vikash.near", "yashank.near", "johanga108.near", "rahulgoel.near"]',
  },
  "3edd9a30f726eca4bffaa9996fce3d290a475e71b8aa64819d0ea5387472136b": {
    1: '["psalm.near", "dk_51.near", "whendacha.near", "vadim.near", "rexux.near", "planetaworld.near"]',
    2: '["iamanansari.near", "flame1.near", "kumarkrsronit.near", "as.near", "alphaflexhub.near"]',
    3: '["johanga108.near", "izubair.near", "rahulgoel.near", "vikash.near", "yashank.near"]',
  },
  "hannahroj.near": {
    1: '["louisliu.near"]',
    2: '["keyokey.near", "bishi.near", "achildhoodhero.near", "jloc.near"]',
    3: '["cryptois.near", "aurorafinance1.near", "yourdad.near", "andersonr.near", "dabbie3229.near", "mohaa.near", "danieldao.near"]',
  },
  "zaddu.near": {
    1: '["vadim.near", "web3hedge.near", "whendacha.near", "denbite.near", "rileytran.near", "maxkott.near", "haenko.near", "masterofcode.near", "davletuner.near", "vlad.near", "mob.near", "dk_51.near", "rexux.near", "auroracfo.near", "kiskesis.near"]',
    2: '["ahsas.near", "evangel.near", "techdir.near", "iamanansari.near", "rubycop.near", "as.near", "flame1.near"]',
    3: '["tolmindev.near", "izubair.near", "johanga108.near", "yourdad.near", "moska.near", "rahulgoel.near", "yonota.near"]',
  },
  "mido4bs.near": {
    1: '["monish016.near", "berynteoh.near", "wizzow.near", "vandal.near", "guaschingmachines.near", "frado.near", "achoski.near", "kelsontoh.near", "bearmans.near", "sahilmassey.near", "eschnoeckel.near", "ntrucchinh.near", "ugxnear.near", "salikc9.near", "earnestetim.near"]',
    2: '["jgold.near", "marieke.near", "ndcplug.near", "harveys.near", "kwhyc.near", "reespect.near", "antmarshall360.near"]',
    3: '["nftmuse.near", "crans.near", "williamxx.near", "larkim.near", "mohaa.near", "abdulkareem.near", "manutegus.near"]',
  },
  "claudiap55.near": {
    1: '["luciotato.near", "fritzwagner.near", "cryptocredit.near", "whendacha.near", "alan777.near", "frado.near"]',
    2: '["vianftbrasil.near", "izcc.near", "marieke.near", "as.near", "mattlock.near", "harveys.near", "jloc.near"]',
    3: '["ramgor.near", "vikash.near", "andersonr.near", "rahulgoel.near"]',
  },
  "jorgealonso.near": {
    1: '["fritzwagner.near", "luciotato.near", "kemo.near", "alan777.near"]',
    2: '["jloc.near", "izcc.near", "harveys.near", "mattlock.near", "marieke.near", "vianftbrasil.near"]',
    3: '["ramgor.near", "vikash.near", "andersonr.near"]',
  },
  "maickool.near": {
    1: '["kemo.near", "luciotato.near", "alan777.near", "fritzwagner.near", "igboze_builder.near", "whendacha.near"]',
    2: '["harveys.near", "jloc.near", "marieke.near", "izcc.near", "mattlock.near"]',
    3: '["rahulgoel.near", "vikash.near", "kriptoraptor.near", "ramgor.near", "andersonr.near", "larkim.near", "blessedchidi.near"]',
  },
  "beesimple.near": {
    1: '["derymars.near", "kemo.near", "fritzwagner.near", "alan777.near", "vandal.near", "chloe.near", "frado.near", "luciotato.near"]',
    2: '["izcc.near", "harveys.near", "kwhyc.near", "marieke.near", "jloc.near", "ahsas.near", "mattlock.near"]',
    3: '["williamxx.near", "vikash.near", "kriptoraptor.near", "ramgor.near", "yourdad.near", "rahulgoel.near"]',
  },
  "jortega.near": {
    1: '["vadim.near", "vlad.near", "maxkott.near", "auroracfo.near", "whendacha.near", "kiskesis.near", "lolson.near", "mob.near", "denbite.near", "dk_51.near", "haenko.near", "louisliu.near", "rexux.near", "wizzow.near", "achoski.near"]',
    2: '["iamanansari.near", "techdir.near", "ahsas.near", "evangel.near", "as.near", "chefsale.near", "gagdiez.near"]',
    3: '["yonota.near", "moska.near", "johanga108.near", "rahulgoel.near", "maks1mk_a.near", "izubair.near"]',
  },
  "puredamage.near": {
    1: '["haenko.near", "kiskesis.near", "whendacha.near", "lolson.near", "denbite.near", "mob.near", "vlad.near", "rexux.near", "auroracfo.near", "masterofcode.near", "davletuner.near", "dk_51.near", "frado.near", "woben.near", "tutmt.near"]',
    2: '["ahsas.near", "iamanansari.near", "as.near", "evangel.near", "kwhyc.near", "vianftbrasil.near", "nearkat.near"]',
    3: '["johanga108.near", "rahulgoel.near", "moska.near", "yonota.near", "izubair.near", "rektdegen.near", "aurorafinance1.near"]',
  },
  "angyc.near": {
    1: '["frado.near", "maxkott.near", "monish016.near", "alan777.near", "cryptocredit.near", "fritzwagner.near", "kemo.near", "igboze_builder.near", "luciotato.near", "chloe.near"]',
    2: '["ahsas.near", "izcc.near", "harveys.near", "marieke.near", "vianftbrasil.near", "jloc.near"]',
    3: '["ramgor.near", "johanga108.near", "andersonr.near", "vikash.near", "rahulgoel.near"]',
  },
  "khushali.near": {
    1: '["mob.near", "davletuner.near", "web3hedge.near", "fritzwagner.near", "rileytran.near", "auroracfo.near", "dk_51.near", "haenko.near", "denbite.near", "kiskesis.near", "maxkott.near", "rexux.near", "vadim.near", "whendacha.near", "cameron.near"]',
    2: '["as.near", "flame1.near", "harveys.near", "frol.near", "iamanansari.near", "techdir.near", "rubycop.near"]',
    3: '["johanga108.near", "vikash.near", "izubair.near", "yashank.near", "rahulgoel.near", "yonota.near", "moska.near"]',
  },
  "mc2128.near": {
    1: '["nguyencuong.near", "louisliu.near", "fritzwagner.near", "tutmt.near", "rileytran.near"]',
    2: '["harveys.near"]',
    3: '["kriptoraptor.near", "danieldao.near", "manchutsca.near", "williamxx.near", "vikash.near", "ramgor.near", "rahulgoel.near"]',
  },
  "ginamm.near": {
    1: '["fritzwagner.near", "alan777.near", "whendacha.near", "vlad.near", "igboze_builder.near"]',
    2: '["as.near", "marieke.near", "vianftbrasil.near", "izcc.near", "harveys.near", "jloc.near", "mattlock.near"]',
    3: '["vikash.near", "ramgor.near", "andersonr.near", "williamxx.near", "rahulgoel.near", "blessedchidi.near"]',
  },
  "mortal_strike.near": {
    1: '["denbite.near", "mob.near", "rexux.near", "kiskesis.near", "whendacha.near", "dk_51.near", "lolson.near", "maxkott.near", "auroracfo.near", "haenko.near", "masterofcode.near", "berynteoh.near", "luciotato.near", "dedeukwu.near", "davletuner.near"]',
    2: '["rubycop.near", "evangel.near", "techdir.near", "ahsas.near", "as.near"]',
    3: '["johanga108.near", "yonota.near", "rahulgoel.near", "moska.near", "izubair.near", "yourdad.near", "christinas.near"]',
  },
  "mytearsyourwater.near": {
    1: '["davletuner.near", "haenko.near", "dk_51.near", "vlad.near", "kiskesis.near", "denbite.near", "masterofcode.near", "mob.near", "vadim.near", "whendacha.near", "rexux.near", "maxkott.near", "earnestetim.near", "p3ter.near", "vandal.near"]',
    2: '["techdir.near", "evangel.near"]',
    3: '["rahulgoel.near", "izubair.near", "yonota.near", "moska.near", "yourdad.near", "johanga108.near"]',
  },
  "oyaniuk.near": {
    1: '["iamgalt.near"]',
    2: '["yesn.near", "ndcplug.near", "rubycop.near", "kwhyc.near", "frol.near", "mattlock.near"]',
    3: '["cryptois.near", "moska.near", "jarednotjerry.near", "pironi.near", "alejandro.near", "nftmuse.near", "cjpd.near"]',
  },
  "016663194c2e37df8faaf3570056b59b6219a090cfc9f38c2e6ad0763f4cbed1": {
    1: '["whendacha.near", "rexux.near", "vadim.near", "derymars.near", "dk_51.near"]',
    2: '["iamanansari.near", "flame1.near", "kumarkrsronit.near", "as.near"]',
    3: '["yashank.near", "vikash.near", "izubair.near", "rahulgoel.near", "johanga108.near"]',
  },
  "12d9ce13c14d250643ca00cfa0ea25ae186386affbd153f277c16f7dea95e3d7": {
    1: '["vadim.near", "lolson.near", "auroracfo.near", "mob.near", "rexux.near", "vlad.near", "maxkott.near", "whendacha.near", "haenko.near", "dk_51.near", "davletuner.near", "denbite.near", "odins_eyehole.near", "masterofcode.near", "kiskesis.near"]',
    2: '["frol.near", "rubycop.near", "evangel.near", "iamanansari.near", "as.near", "techdir.near", "ahsas.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "zerex.near": {
    1: '["masterofcode.near", "mob.near", "rexux.near", "davletuner.near", "dk_51.near", "kiskesis.near", "haenko.near", "denbite.near", "vlad.near", "whendacha.near", "maxkott.near", "fritzwagner.near", "vadim.near", "auroracfo.near", "woben.near"]',
    2: '["iamanansari.near", "ahsas.near", "as.near", "rubycop.near", "frol.near", "evangel.near", "techdir.near"]',
    3: '["moska.near", "tolmindev.near", "rahulgoel.near", "yonota.near", "johanga108.near", "vikash.near", "izubair.near"]',
  },
  "yasik.near": {
    1: '["masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  f18cdf5943951c9be8c08c55e3e816453a5730fb7e84354e31d909ad79801d44: {
    1: '["cameron.near", "odins_eyehole.near", "auroracfo.near", "rexux.near", "denbite.near", "mob.near", "davletuner.near", "vlad.near", "lolson.near", "dk_51.near", "maxkott.near", "haenko.near", "kiskesis.near", "vadim.near", "whendacha.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "maks1mk_a.near"]',
  },
  "94367d3f3abfe59b16d759b05c3dcfba10bd55a664c846b7bcb24551bd2229e9": {
    1: '["vlad.near", "kiskesis.near", "davletuner.near", "psalm.near", "vadim.near", "maxkott.near", "dk_51.near", "lolson.near", "rexux.near", "auroracfo.near", "odins_eyehole.near", "denbite.near", "mob.near", "haenko.near", "whendacha.near"]',
    2: '["evangel.near", "rubycop.near", "iamanansari.near", "techdir.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["moska.near", "yonota.near", "izubair.near", "rahulgoel.near", "yourdad.near", "tolmindev.near", "johanga108.near"]',
  },
  "sabrez.near": {
    1: '["denbite.near", "vadim.near", "fritzwagner.near", "maxkott.near", "dk_51.near", "auroracfo.near", "haenko.near", "davletuner.near", "whendacha.near", "rexux.near", "mob.near", "kiskesis.near", "vlad.near", "masterofcode.near", "davidweinstein.near"]',
    2: '["as.near", "evangel.near", "frol.near", "rubycop.near", "techdir.near", "ahsas.near", "iamanansari.near"]',
    3: '["vikash.near", "johanga108.near", "yonota.near", "moska.near", "rahulgoel.near", "izubair.near", "tolmindev.near"]',
  },
  "lenardgarcia.near": {
    1: '["vlad.near", "denbite.near", "haenko.near", "mob.near", "web3hedge.near", "whendacha.near", "masterofcode.near", "kiskesis.near", "vadim.near", "lolson.near", "dk_51.near", "odins_eyehole.near", "igboze_builder.near", "rileytran.near", "derymars.near"]',
    2: '["evangel.near", "iamanansari.near", "as.near", "techdir.near", "ahsas.near", "rubycop.near", "983dcdc8e0d80d1f8938118161e1ec08be6557809afccd5ec396354f28a2ce78"]',
    3: '["rahulgoel.near", "izubair.near", "yonota.near", "moska.near", "yourdad.near", "johanga108.near", "escobarindo.near"]',
  },
  "epi.near": {
    1: '["whendacha.near", "kiskesis.near", "masterofcode.near", "vadim.near", "rexux.near", "haenko.near", "web3hedge.near", "dk_51.near", "mob.near", "auroracfo.near", "odins_eyehole.near", "monish016.near", "vlad.near", "lolson.near", "woben.near"]',
    2: '["iamanansari.near", "techdir.near", "ahsas.near", "rubycop.near", "evangel.near", "nearkat.near", "as.near"]',
    3: '["johanga108.near", "moska.near", "yonota.near", "rahulgoel.near", "izubair.near", "yourdad.near", "arezhas.near"]',
  },
  "elrayo.near": {
    1: '["luciotato.near", "alan777.near"]',
    2: '["izcc.near"]',
    3: '["alejandro.near"]',
  },
  "ajju0008.near": {
    1: '["rexux.near", "whendacha.near", "psalm.near", "vadim.near", "dk_51.near", "derymars.near"]',
    2: '["flame1.near", "as.near", "kumarkrsronit.near", "iamanansari.near"]',
    3: '["yashank.near", "johanga108.near", "izubair.near", "vikash.near", "rahulgoel.near"]',
  },
  "8366e0b555702e20f2101e052a9e9165edf6dff486219f0714c28ee20f06324d": {
    1: '["luciotato.near", "alan777.near"]',
    2: '["izcc.near"]',
    3: '["alejandro.near"]',
  },
  "700f9da36d1eb02a7628b3b71c26bed6f4a8b00d802ea869c51e49925d2439d1": {
    1: '["vadim.near", "maxkott.near", "odins_eyehole.near", "denbite.near", "psalm.near", "rexux.near", "lolson.near", "davletuner.near", "mob.near", "haenko.near", "auroracfo.near", "kiskesis.near", "whendacha.near", "dk_51.near", "vlad.near"]',
    2: '["as.near", "iamanansari.near", "rubycop.near", "frol.near", "evangel.near", "techdir.near", "ahsas.near"]',
    3: '["moska.near", "johanga108.near", "rahulgoel.near", "yourdad.near", "tolmindev.near", "yonota.near", "izubair.near"]',
  },
  "megaverse.near": {
    1: '["kemo.near", "nguyencuong.near", "ntrucchinh.near", "whendacha.near", "alan777.near", "luciotato.near", "tutmt.near", "derymars.near", "louisliu.near", "davletuner.near", "fritzwagner.near", "kiskesis.near", "dk_51.near", "odins_eyehole.near", "psalm.near"]',
    2: '["harveys.near", "as.near"]',
    3: '["manchutsca.near", "danieldao.near"]',
  },
  "denden.near": {
    1: '["denbite.near", "vlad.near", "web3hedge.near", "masterofcode.near", "lolson.near", "dk_51.near", "mob.near", "kiskesis.near", "haenko.near", "whendacha.near", "rexux.near", "auroracfo.near", "tutmt.near", "wizzow.near", "tiffany.near"]',
    2: '["rubycop.near", "as.near", "iamanansari.near", "ahsas.near", "techdir.near", "evangel.near", "kwhyc.near"]',
    3: '["yonota.near", "yourdad.near", "johanga108.near", "izubair.near", "moska.near", "rahulgoel.near", "kriptoraptor.near"]',
  },
  "1a39ecea12da3909fb8aeba16070ac32c971d1d7246391817f1b403814098155": {
    1: '["odins_eyehole.near", "vlad.near", "vadim.near", "rexux.near", "denbite.near", "kiskesis.near", "whendacha.near", "lolson.near", "psalm.near", "maxkott.near", "auroracfo.near", "mob.near", "dk_51.near", "davletuner.near", "haenko.near"]',
    2: '["as.near", "ahsas.near", "rubycop.near", "frol.near", "evangel.near", "iamanansari.near", "techdir.near"]',
    3: '["rahulgoel.near", "tolmindev.near", "johanga108.near", "moska.near", "yourdad.near", "izubair.near", "yonota.near"]',
  },
  "bardd.near": {
    1: '["whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "davletuner.near", "mob.near", "vlad.near", "rexux.near", "auroracfo.near", "denbite.near", "psalm.near", "odins_eyehole.near"]',
    2: '["as.near", "techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "ahsas.near", "frol.near"]',
    3: '["yonota.near", "yourdad.near", "tolmindev.near", "izubair.near", "johanga108.near", "moska.near", "rahulgoel.near"]',
  },
  "6484425ebbcd7940c4874b7443b312d386a9c350bbbf40e7efe0e562ed9224e8": {
    1: '["psalm.near", "vadim.near", "odins_eyehole.near", "maxkott.near", "lolson.near", "vlad.near", "kiskesis.near", "auroracfo.near", "mob.near", "davletuner.near", "haenko.near", "whendacha.near", "denbite.near", "rexux.near", "dk_51.near"]',
    2: '["evangel.near", "iamanansari.near", "ahsas.near", "as.near", "rubycop.near", "techdir.near", "frol.near"]',
    3: '["tolmindev.near", "yourdad.near", "rahulgoel.near", "izubair.near", "yonota.near", "johanga108.near", "moska.near"]',
  },
  "neer.near": {
    1: '["kiskesis.near", "vadim.near", "mob.near", "whendacha.near", "vlad.near", "dk_51.near", "lolson.near", "masterofcode.near", "haenko.near", "web3hedge.near", "denbite.near", "derymars.near", "monish016.near", "tutmt.near", "klint.near"]',
    2: '["as.near", "ahsas.near", "evangel.near", "techdir.near", "rubycop.near", "gagdiez.near", "jloc.near"]',
    3: '["johanga108.near", "moska.near", "yourdad.near", "rahulgoel.near", "yonota.near", "izubair.near", "rektdegen.near"]',
  },
  "4466752245676eb6f64cbcf8e1343e416e586a4930bf84568d342d8eb48b8d68": {
    1: '["vlad.near", "rexux.near", "davidweinstein.near", "mob.near", "dk_51.near", "whendacha.near", "vadim.near", "lolson.near", "kiskesis.near", "kennyj.near", "cronus.near", "kelsontoh.near", "maxkott.near", "denbite.near", "haenko.near"]',
    2: '["techdir.near", "rubycop.near", "frol.near", "evangel.near", "bishi.near", "ahsas.near", "iamanansari.near"]',
    3: '["blessedchidi.near", "moska.near", "yourdad.near", "johanga108.near", "rahulgoel.near", "yonota.near", "izubair.near"]',
  },
  "leyner.near": {
    1: '["alan777.near", "fritzwagner.near", "kemo.near", "luciotato.near"]',
    2: '["izcc.near", "harveys.near"]',
    3: '["kriptoraptor.near", "larkim.near", "rahulgoel.near"]',
  },
  "2ebad7a01e076579b605a2597d0000490c4c61fc6b73c1ebbec116656ff0ab38": {
    1: '["odins_eyehole.near", "vadim.near", "vlad.near", "whendacha.near", "dk_51.near", "lolson.near", "rexux.near", "kiskesis.near", "psalm.near", "maxkott.near", "auroracfo.near", "davletuner.near", "mob.near", "denbite.near", "haenko.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "nftcreator777.near": {
    1: '["masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near", "gcohen.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "nearkat.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "vincentcfpun.near"]',
  },
  "macarli.near": {
    1: '["whendacha.near", "dk_51.near", "ntrucchinh.near", "rexux.near", "ugxnear.near", "planetaworld.near", "derymars.near", "psalm.near"]',
    2: '["flame1.near", "alphaflexhub.near", "iamanansari.near", "kumarkrsronit.near", "bishi.near", "kennethjay.near"]',
    3: '["izubair.near", "rahulgoel.near", "vikash.near", "johanga108.near", "yashank.near", "blessedchidi.near"]',
  },
  "ankit2866.near": {
    1: '["dk_51.near", "rexux.near", "psalm.near", "whendacha.near"]',
    2: '["flame1.near", "alphaflexhub.near", "iamanansari.near", "kumarkrsronit.near", "983dcdc8e0d80d1f8938118161e1ec08be6557809afccd5ec396354f28a2ce78", "antmarshall360.near", "as.near"]',
    3: '["izubair.near", "johanga108.near", "abdulkareem.near", "vikash.near", "rahulgoel.near", "yashank.near", "mohaa.near"]',
  },
  "kingsinghh.near": {
    1: '["rexux.near", "dk_51.near", "whendacha.near", "psalm.near"]',
    2: '["iamanansari.near", "flame1.near", "alphaflexhub.near", "kumarkrsronit.near", "ahsas.near"]',
    3: '["larkim.near", "mohaa.near", "vikash.near", "izubair.near", "rahulgoel.near", "yashank.near", "arezhas.near"]',
  },
  "0cbdd61ecd894c8f4b6c50fcb064173ff40c2be5b94a9fe09fcc0a8c5f5a9184": {
    1: '["maxkott.near", "vadim.near", "davletuner.near", "haenko.near", "mob.near", "denbite.near", "vlad.near", "auroracfo.near", "dk_51.near", "masterofcode.near", "whendacha.near", "kiskesis.near", "odins_eyehole.near", "psalm.near", "lolson.near"]',
    2: '["as.near", "frol.near", "evangel.near", "techdir.near", "rubycop.near", "ahsas.near", "iamanansari.near"]',
    3: '["yonota.near", "moska.near", "johanga108.near", "rahulgoel.near", "tolmindev.near", "yourdad.near", "izubair.near"]',
  },
  "skymage.near": {
    1: '["dk_51.near", "kiskesis.near", "auroracfo.near", "masterofcode.near", "denbite.near", "mob.near", "whendacha.near", "haenko.near", "rexux.near", "web3hedge.near", "lolson.near", "vadim.near", "tutmt.near", "gcohen.near", "davletuner.near"]',
    2: '["rubycop.near", "iamanansari.near", "ahsas.near", "techdir.near", "evangel.near", "kangaroojack.near", "vianftbrasil.near"]',
    3: '["rahulgoel.near", "johanga108.near", "tolmindev.near", "yonota.near", "moska.near", "izubair.near", "christinas.near"]',
  },
  "imtilted.near": {
    1: '["kiskesis.near", "dk_51.near", "mob.near", "maxkott.near", "denbite.near", "vadim.near", "auroracfo.near", "haenko.near", "lolson.near", "whendacha.near", "rexux.near"]',
    2: '["rubycop.near", "ahsas.near", "evangel.near", "frol.near", "iamanansari.near", "techdir.near", "flame1.near"]',
    3: '["yonota.near", "rahulgoel.near", "moska.near", "izubair.near", "johanga108.near", "yourdad.near", "waverlymaven.near"]',
  },
  "agnesba.near": {
    1: '["tutmt.near", "vandal.near", "fritzwagner.near", "ntrucchinh.near", "whendacha.near", "kemo.near", "guaschingmachines.near", "louisliu.near", "kelsontoh.near", "tiffany.near", "frado.near", "mob.near", "ogruss.near", "derymars.near", "gcohen.near"]',
    2: '["marieke.near", "harveys.near", "ndcplug.near", "kwhyc.near"]',
    3: '["crans.near", "williamxx.near", "danieldao.near", "alejandro.near", "manchutsca.near"]',
  },
  "dachi.near": {
    1: '["dedeukwu.near", "vandal.near", "guaschingmachines.near", "fritzwagner.near", "frado.near", "igboze_builder.near", "ogruss.near", "sahilmassey.near", "monish016.near", "wizzow.near", "psalm.near"]',
  },
  "serezhaolshan.near": {
    1: '["iamgalt.near", "ogruss.near", "kennyj.near", "gcohen.near", "davidweinstein.near", "kazanderdad.near", "masterofcode.near", "derymars.near", "kemo.near", "kekiboh.near", "achoski.near", "salikc9.near", "nguyencuong.near", "kiskesis.near", "denbite.near"]',
    2: '["kwhyc.near", "harveys.near", "techdir.near", "achildhoodhero.near", "gagdiez.near", "joespano.near", "bishi.near"]',
    3: '["manutegus.near", "vincentcfpun.near", "arezhas.near", "ramgor.near", "andersonr.near", "yonota.near", "manchutsca.near"]',
  },
  c9493b741941d096c4bb1d93effaebd6743b2b5eb7a5f3c044963d2d9c368b1c: {
    1: '["whendacha.near", "psalm.near", "dk_51.near", "rexux.near"]',
    2: '["iamanansari.near", "kumarkrsronit.near", "as.near", "flame1.near"]',
    3: '["johanga108.near", "izubair.near", "yashank.near", "vikash.near", "rahulgoel.near"]',
  },
  "3fb88f90f1b69ed18c576276ffc92c8e4dcd4ff2f9fde17fe7be316465c468a5": {
    1: '["iamgalt.near"]',
    2: '["yesn.near", "ndcplug.near", "rubycop.near", "marieke.near", "mattlock.near", "frol.near", "kwhyc.near"]',
    3: '["jarednotjerry.near", "alejandro.near", "cjpd.near", "moska.near", "cryptois.near", "pironi.near", "nftmuse.near"]',
  },
  "holygrease.near": {
    1: '["iamgalt.near", "mob.near", "gcohen.near", "odins_eyehole.near", "kelsontoh.near", "chloe.near", "woben.near", "cronus.near", "haenko.near", "kennyj.near", "denbite.near", "cameron.near", "vlad.near", "thisthatjosh.near", "ntrucchinh.near"]',
    2: '["frol.near", "marieke.near", "mattlock.near", "rubycop.near", "ndcplug.near", "yesn.near", "kwhyc.near"]',
    3: '["alejandro.near", "cryptois.near", "nftmuse.near", "pironi.near", "cjpd.near", "jarednotjerry.near", "moska.near"]',
  },
  "eugenewolf507.near": {
    1: '["iamgalt.near", "berynteoh.near"]',
    2: '["evangel.near"]',
    3: '["moska.near"]',
  },
  "danieldao.near": {
    1: '["fritzwagner.near", "nguyencuong.near", "alan777.near", "luciotato.near", "odins_eyehole.near", "kemo.near", "whendacha.near", "kelsontoh.near", "derymars.near", "louisliu.near", "tutmt.near", "psalm.near", "web3hedge.near", "dk_51.near", "mob.near"]',
    2: '["harveys.near"]',
    3: '["williamxx.near", "danieldao.near", "manchutsca.near", "rahulgoel.near", "ramgor.near", "kriptoraptor.near", "escobarindo.near"]',
  },
  "miniwaxx.near": {
    1: '["odins_eyehole.near", "vlad.near", "davletuner.near", "whendacha.near", "masterofcode.near", "mob.near", "maxkott.near", "kiskesis.near", "vadim.near", "denbite.near", "auroracfo.near", "haenko.near", "rexux.near", "lolson.near", "dk_51.near"]',
    2: '["techdir.near", "rubycop.near", "ahsas.near", "evangel.near", "as.near", "frol.near", "iamanansari.near"]',
    3: '["yourdad.near", "izubair.near", "yonota.near", "johanga108.near", "rahulgoel.near", "moska.near", "tolmindev.near"]',
  },
  "gordey13.near": {
    1: '["iamgalt.near", "davidweinstein.near", "kennyj.near", "masterofcode.near", "planetaworld.near", "rileytran.near", "odins_eyehole.near", "maxkott.near", "eschnoeckel.near", "tutmt.near", "mob.near", "cronus.near", "vadim.near", "gcohen.near", "sahilmassey.near"]',
    2: '["keyokey.near", "alyonushka.near", "evangel.near", "mattlock.near", "achildhoodhero.near", "kwhyc.near", "techdir.near"]',
    3: '["arezhas.near", "nftmuse.near", "moska.near", "williamxx.near", "waverlymaven.near", "yonota.near", "ntare.near"]',
  },
  f3b95880bdb450d0f4910959f62c0b3fdbb2f091d04d2630271a01bfb426300b: {
    1: '["masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "arturoadelante.near": {
    1: '["luciotato.near", "fritzwagner.near", "alan777.near", "kemo.near"]',
    2: '["jloc.near", "harveys.near", "izcc.near"]',
    3: '["kriptoraptor.near", "ramgor.near", "rahulgoel.near"]',
  },
  "lifeofyurii.near": {
    1: '["mob.near", "gcohen.near", "kelsontoh.near", "chloe.near", "woben.near", "cronus.near", "haenko.near", "kennyj.near", "iamgalt.near", "denbite.near", "cameron.near", "vadim.near", "vlad.near", "thisthatjosh.near"]',
    2: '["yesn.near", "ndcplug.near", "rubycop.near", "mattlock.near", "marieke.near", "frol.near", "kwhyc.near"]',
    3: '["jarednotjerry.near", "alejandro.near", "cjpd.near", "cryptois.near", "pironi.near", "nftmuse.near", "moska.near"]',
  },
  "kashey.near": {
    1: '["iamgalt.near"]',
    2: '["rubycop.near", "robert.near"]',
    3: '["aurorafinance1.near"]',
  },
  "29aa903af76840e2aff35f9fdd23ba36012140cf6bcc4fbf7b988f8d6d72a54d": {
    1: '["cameron.near", "thisthatjosh.near", "vlad.near", "iamgalt.near", "odins_eyehole.near", "woben.near", "vadim.near", "denbite.near", "mob.near", "gcohen.near", "chloe.near", "haenko.near", "cronus.near", "kelsontoh.near", "kennyj.near"]',
    2: '["yesn.near", "ndcplug.near", "rubycop.near", "mattlock.near", "marieke.near", "kwhyc.near", "frol.near"]',
    3: '["jarednotjerry.near", "alejandro.near", "cjpd.near", "moska.near", "cryptois.near", "pironi.near", "nftmuse.near"]',
  },
  "olehbandrivskyi.near": {
    1: '["alan777.near", "kemo.near", "vadim.near", "iamgalt.near", "davletuner.near", "ntrucchinh.near", "vlad.near", "haenko.near", "kelsontoh.near", "cronus.near", "tiffany.near", "woben.near", "thisthatjosh.near", "cameron.near", "odins_eyehole.near"]',
    2: '["yesn.near", "ndcplug.near", "kwhyc.near", "duocelot.near", "chefsale.near", "jgold.near", "reespect.near"]',
    3: '["jarednotjerry.near", "alejandro.near", "moska.near", "vincentcfpun.near", "ntare.near", "izubair.near", "yashank.near"]',
  },
  "jedimindtricks.near": { 1: '["iamgalt.near"]' },
  "maxam.near": {
    1: '["denbite.near", "rileytran.near", "masterofcode.near", "davletuner.near", "whendacha.near", "kiskesis.near", "dk_51.near", "maxkott.near", "haenko.near", "mob.near", "rexux.near", "cameron.near", "auroracfo.near", "vlad.near", "vadim.near"]',
    2: '["evangel.near", "iamanansari.near", "rubycop.near", "techdir.near", "ahsas.near", "as.near", "frol.near"]',
    3: '["johanga108.near", "moska.near", "izubair.near", "maks1mk_a.near", "yonota.near", "rahulgoel.near", "kriptoraptor.near"]',
  },
  "vincentcfpun.near": {
    1: '["gcohen.near"]',
    2: '["nearkat.near"]',
    3: '["vincentcfpun.near", "waverlymaven.near"]',
  },
  "events.near": {
    1: '["gcohen.near"]',
    2: '["nearkat.near"]',
    3: '["vincentcfpun.near", "waverlymaven.near"]',
  },
  "seck.near": {
    1: '["psalm.near", "igboze_builder.near", "dk_51.near"]',
    2: '["as.near", "kennethjay.near"]',
    3: '["dabbie3229.near", "kriptoraptor.near", "rahulgoel.near"]',
  },
  "kennethjay.near": {
    1: '["dk_51.near", "igboze_builder.near", "psalm.near", "guaschingmachines.near"]',
    2: '["kennethjay.near", "alphaflexhub.near", "flame1.near"]',
    3: '["kriptoraptor.near", "abdulkareem.near", "larkim.near", "dabbie3229.near", "rahulgoel.near"]',
  },
  "monkeydu.near": {
    1: '["dk_51.near", "psalm.near", "rexux.near", "whendacha.near"]',
    2: '["kumarkrsronit.near", "alphaflexhub.near", "ahsas.near", "flame1.near", "iamanansari.near"]',
    3: '["izubair.near", "vikash.near", "yourdad.near", "rahulgoel.near", "yashank.near"]',
  },
  "butola_ravi.near": {
    1: '["mob.near", "davletuner.near", "haenko.near", "masterofcode.near", "kiskesis.near", "cameron.near", "woben.near", "whendacha.near", "denbite.near", "maxkott.near", "auroracfo.near", "vadim.near", "fritzwagner.near", "dk_51.near", "rexux.near"]',
    2: '["mattlock.near", "ahsas.near", "flame1.near", "iamanansari.near", "as.near", "kumarkrsronit.near", "jlw.near"]',
    3: '["izubair.near", "kriptoraptor.near", "rahulgoel.near", "yashank.near", "johanga108.near", "mohaa.near", "manutegus.near"]',
  },
  "cotmusic.near": {
    1: '["earnestetim.near", "frado.near", "guaschingmachines.near", "monish016.near", "fritzwagner.near", "vandal.near", "dedeukwu.near", "psalm.near", "wizzow.near", "ogruss.near", "chloe.near", "sahilmassey.near", "igboze_builder.near"]',
    2: '["reespect.near", "alphaflexhub.near", "marieke.near", "kwhyc.near", "duocelot.near", "sammiee1.near", "ndcplug.near"]',
    3: '["crans.near", "williamxx.near", "larkim.near", "abdulkareem.near"]',
  },
  "05b65922831714a24b9235d14b0b3e38aed2b4da806565004b2ddc22c9c4e566": {
    1: '["masterofcode.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "dund.near": {
    1: '["louisliu.near"]',
    2: '["ahsas.near"]',
    3: '["andersonr.near"]',
  },
  "1ff933c2e0b4e169807573b90362b4ce49f852d0e987f41ff7fcc31166d8da65": {
    1: '["whendacha.near", "lolson.near", "kiskesis.near", "vlad.near", "rexux.near", "vadim.near", "haenko.near", "igboze_builder.near", "dk_51.near", "mob.near", "maxkott.near", "denbite.near", "kazanderdad.near", "ogruss.near", "alan777.near"]',
    2: '["evangel.near", "robert.near", "as.near", "rubycop.near", "frol.near", "iamanansari.near", "techdir.near"]',
    3: '["moska.near", "rahulgoel.near", "yonota.near", "izubair.near", "johanga108.near", "yourdad.near", "tolmindev.near"]',
  },
  "mvtrading.near": {
    1: '["fritzwagner.near"]',
    2: '["jloc.near"]',
    3: '["yourdad.near"]',
  },
  b52b2637e80e864829aee8b5e90454655c926f926cfb54b92790c9a7fcb13c6c: {
    1: '["masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "mob.near", "odins_eyehole.near", "auroracfo.near", "maxkott.near", "dk_51.near", "vlad.near", "davletuner.near", "denbite.near", "rexux.near", "lolson.near"]',
    2: '["ahsas.near", "techdir.near", "reespect.near", "frol.near", "evangel.near", "iamanansari.near", "as.near"]',
    3: '["yourdad.near", "yonota.near", "johanga108.near", "moska.near", "ramgor.near", "rahulgoel.near", "izubair.near"]',
  },
  "sujeetsingh.near": {
    1: '["whendacha.near", "vadim.near", "dk_51.near", "psalm.near", "rexux.near"]',
    2: '["iamanansari.near", "kumarkrsronit.near", "as.near"]',
    3: '["vikash.near", "izubair.near", "rahulgoel.near", "yashank.near"]',
  },
  "gekis_hapi.near": {
    1: '["masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "rkonoval.near": {
    1: '["masterofcode.near", "vadim.near", "whendacha.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "masterofcode.near": {
    1: '["masterofcode.near", "vlad.near", "vadim.near", "mob.near", "kiskesis.near", "haenko.near", "maxkott.near", "whendacha.near", "lolson.near", "davletuner.near", "auroracfo.near", "dk_51.near", "web3hedge.near"]',
    2: '["techdir.near", "ahsas.near", "frol.near", "as.near", "rubycop.near", "iamanansari.near", "evangel.near"]',
    3: '["johanga108.near", "moska.near"]',
  },
  "bixinklpool.near": { 1: '["louisliu.near"]', 3: '["cryptois.near"]' },
  "himars.near": {
    1: '["masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near", "auroracfo.near", "tiffany.near"]',
    2: '["techdir.near", "evangel.near", "frol.near", "ahsas.near", "as.near", "rubycop.near", "iamanansari.near"]',
    3: '["rahulgoel.near", "izubair.near", "moska.near", "johanga108.near", "yonota.near", "tolmindev.near", "yourdad.near"]',
  },
  "maloy.near": {
    1: '["auroracfo.near", "rexux.near", "masterofcode.near", "whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  e54c0b87de151de608e0cfb9f31c2a70001219b9fd6a85be36d1089c95af851b: {
    1: '["auroracfo.near", "rexux.near", "denbite.near", "mob.near", "davletuner.near", "vlad.near", "lolson.near", "dk_51.near", "maxkott.near", "haenko.near", "kiskesis.near", "vadim.near", "whendacha.near", "masterofcode.near", "cronus.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "yonota.near", "johanga108.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "zhanglong.near": { 1: '["louisliu.near"]' },
  "violet_spades.near": {
    1: '["auroracfo.near", "davletuner.near", "dk_51.near", "haenko.near", "maxkott.near", "mob.near", "odins_eyehole.near", "rexux.near", "vlad.near", "whendacha.near", "vadim.near", "lolson.near", "denbite.near", "kiskesis.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "as.near", "ahsas.near", "frol.near"]',
    3: '["yourdad.near", "tolmindev.near", "johanga108.near", "yonota.near", "moska.near", "izubair.near", "rahulgoel.near"]',
  },
  "kumarkrsronit.near": {
    1: '["whendacha.near", "rexux.near", "vadim.near", "dk_51.near", "planetaworld.near", "derymars.near", "psalm.near", "tutmt.near"]',
    2: '["iamanansari.near", "as.near", "kumarkrsronit.near", "flame1.near"]',
    3: '["vikash.near", "rahulgoel.near", "yashank.near", "johanga108.near", "izubair.near", "tolmindev.near"]',
  },
  "alecaseg.near": {
    1: '["fritzwagner.near"]',
    2: '["jloc.near"]',
    3: '["ramgor.near"]',
  },
  "vanshika.near": {
    1: '["whendacha.near", "cronus.near", "dk_51.near", "ogruss.near", "rexux.near", "haenko.near", "odins_eyehole.near", "vadim.near", "maxkott.near", "planetaworld.near", "kiskesis.near", "lolson.near"]',
    2: '["flame1.near", "iamanansari.near", "kumarkrsronit.near", "as.near"]',
    3: '["rahulgoel.near", "yashank.near", "johanga108.near", "izubair.near", "vikash.near", "kriptoraptor.near"]',
  },
  "dos999.near": {
    1: '["psalm.near"]',
    2: '["flame1.near", "blaze.near", "kumarkrsronit.near", "alphaflexhub.near"]',
    3: '["yashank.near"]',
  },
  "8e863c02e4da477d7be2ebde0a878fb3f11fec3c4516c5b511270daaa03467d1": {
    1: '["whendacha.near", "mob.near", "haenko.near", "denbite.near", "planetaworld.near", "dk_51.near", "vlad.near", "thisthatjosh.near", "vadim.near", "maxkott.near", "kennyj.near", "rexux.near", "lolson.near", "kiskesis.near", "luciotato.near"]',
    2: '["rubycop.near", "as.near", "evangel.near", "frol.near", "kumarkrsronit.near", "techdir.near", "iamanansari.near"]',
    3: '["yonota.near", "johanga108.near", "escobarindo.near", "moska.near", "tolmindev.near", "yourdad.near", "izubair.near"]',
  },
  "roflanmen.near": {
    1: '["haenko.near", "vlad.near", "lolson.near", "kiskesis.near", "mob.near", "dk_51.near", "denbite.near", "vadim.near", "maxkott.near", "whendacha.near", "rexux.near", "odins_eyehole.near", "louisliu.near", "ntrucchinh.near", "davidweinstein.near"]',
    2: '["evangel.near", "as.near", "rubycop.near", "techdir.near", "iamanansari.near", "frol.near", "ndcplug.near"]',
    3: '["moska.near", "yonota.near", "yourdad.near", "escobarindo.near", "izubair.near", "tolmindev.near", "johanga108.near"]',
  },
  "837e155ab22444976c480555cfba93788f76160176ed0cd33c98dc31e150fe53": {
    1: '["whendacha.near", "haenko.near", "vlad.near", "vadim.near", "rexux.near", "mob.near", "maxkott.near", "dk_51.near", "kiskesis.near", "denbite.near", "lolson.near", "gcohen.near", "chloe.near", "wizzow.near", "tiffany.near"]',
    2: '["techdir.near", "rubycop.near", "evangel.near", "iamanansari.near", "as.near", "frol.near", "chefsale.near"]',
    3: '["blessedchidi.near", "tolmindev.near", "izubair.near", "yonota.near", "moska.near", "yourdad.near", "johanga108.near"]',
  },
  "pablo158.near": {
    1: '["psalm.near"]',
    2: '["ahsas.near", "flame1.near", "techdir.near", "iamanansari.near", "as.near", "rubycop.near", "jlw.near"]',
    3: '["yourdad.near"]',
  },
  "ramgor.near": {
    1: '["alan777.near", "luciotato.near", "fritzwagner.near", "dk_51.near", "frado.near", "whendacha.near", "igboze_builder.near", "kemo.near", "cryptocredit.near", "chloe.near"]',
    2: '["jloc.near", "harveys.near", "izcc.near", "as.near", "vianftbrasil.near"]',
    3: '["ramgor.near", "kriptoraptor.near", "andersonr.near", "larkim.near", "rahulgoel.near"]',
  },
  "andresdom.near": {
    1: '["fritzwagner.near", "alan777.near", "kemo.near"]',
    2: '["izcc.near", "jloc.near"]',
    3: '["ramgor.near", "kriptoraptor.near", "larkim.near", "abdulkareem.near"]',
  },
  "0f00d914e7d946a26e424d90b840f0e005736a55e11c6f67c7903b104ee82dc6": {
    1: '["kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "vlad.near", "whendacha.near", "mob.near", "davletuner.near", "denbite.near", "auroracfo.near", "rexux.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "frol.near", "as.near", "ahsas.near"]',
    3: '["yourdad.near"]',
  },
  "uncle_alex.near": {
    1: '["lolson.near", "kiskesis.near", "maxkott.near", "vadim.near", "dk_51.near", "mob.near", "vlad.near", "planetaworld.near", "denbite.near", "auroracfo.near", "haenko.near", "whendacha.near", "davletuner.near", "rexux.near"]',
    2: '["frol.near", "ahsas.near", "as.near", "iamanansari.near", "evangel.near", "techdir.near", "rubycop.near"]',
    3: '["maks1mk_a.near", "yourdad.near", "johanga108.near", "moska.near", "izubair.near", "yonota.near", "tolmindev.near"]',
  },
  "innanear.near": {
    1: '["rexux.near", "vadim.near", "haenko.near", "maxkott.near", "denbite.near", "kiskesis.near", "vlad.near", "whendacha.near", "mob.near", "dk_51.near", "lolson.near"]',
    2: '["evangel.near", "bishi.near", "as.near", "iamanansari.near", "techdir.near", "rubycop.near"]',
    3: '["yourdad.near", "izubair.near", "moska.near", "yonota.near", "johanga108.near", "tolmindev.near"]',
  },
  "maks1mk_a.near": {
    1: '["vadim.near", "maxkott.near", "lolson.near", "haenko.near", "mob.near", "whendacha.near", "auroracfo.near", "denbite.near", "dk_51.near", "rexux.near", "kiskesis.near", "vlad.near", "davletuner.near", "planetaworld.near"]',
    2: '["frol.near", "as.near", "evangel.near", "iamanansari.near", "techdir.near", "ahsas.near", "rubycop.near"]',
    3: '["tolmindev.near", "izubair.near", "moska.near", "yonota.near", "johanga108.near", "yourdad.near"]',
  },
  "miles1.near": {
    1: '["psalm.near"]',
    2: '["flame1.near"]',
    3: '["dabbie3229.near", "yashank.near"]',
  },
  "airdropme.near": {
    1: '["kiskesis.near", "mob.near", "whendacha.near", "vadim.near", "lolson.near", "vlad.near", "haenko.near", "denbite.near", "rexux.near", "dk_51.near", "maxkott.near"]',
    2: '["iamanansari.near", "bishi.near", "as.near", "evangel.near", "rubycop.near"]',
    3: '["johanga108.near", "yonota.near", "yourdad.near", "izubair.near", "moska.near"]',
  },
  "moska.near": {
    1: '["whendacha.near", "vadim.near", "kiskesis.near", "haenko.near", "maxkott.near", "dk_51.near", "lolson.near", "vlad.near", "davletuner.near", "mob.near", "denbite.near", "rexux.near"]',
    2: '["techdir.near", "evangel.near", "iamanansari.near", "rubycop.near", "ahsas.near", "frol.near", "as.near"]',
    3: '["tolmindev.near", "izubair.near", "maks1mk_a.near", "yonota.near", "johanga108.near", "moska.near", "yourdad.near"]',
  },
  "alan777.near": {
    1: '["kazanderdad.near", "vadim.near", "luciotato.near", "haenko.near", "kiskesis.near", "cameron.near", "whendacha.near", "fritzwagner.near", "alan777.near", "chloe.near", "davletuner.near", "dleer.near"]',
    2: '["blaze.near", "mattlock.near", "joespano.near", "izcc.near", "ndcplug.near"]',
    3: '["alejandro.near", "ramgor.near", "jarednotjerry.near", "johanga108.near"]',
  },
};

setVoters(nullified);

// console.log("state", nullified);

if (!voters) {
  return "Loading";
}

const [message, setMessage] = useState(null);

useEffect(() => {
  if (!voters) {
    return;
  }
  const nodes = {};
  const links = [];
  Object.entries(voters).forEach(([accountId, votes]) => {
    if (!(accountId in nodes)) {
      nodes[accountId] = {
        id: accountId,
        group: 4,
        size: 0,
      };
    }
    Object.entries(votes).forEach(([house, votes]) => {
      house = parseInt(house);
      JSON.parse(votes).forEach((candidateId) => {
        nodes[candidateId] = {
          id: candidateId,
          group: house,
          size: (nodes[candidateId]?.size || 0) + 1,
        };
        links.push({
          source: accountId,
          target: candidateId,
          value: 1,
        });
      });
    });
  });
  setMessage({
    nodes: Object.values(nodes),
    links,
  });
}, [voters]);

const code = `
<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v6.js"></script>

<svg id="graph"></svg>

<script>

const run = (data) => {
  const width = 1080;
  const height = 768;
  let dragIsOn = false;
  console.log('data', data)

  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const house = (group) => {
    switch (group) {
      case 1: return "HoM: ";
      case 2: return "CoA: ";
      case 3: return "TC: ";
      default: return "";
    };
  };

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = data.links.map(d => ({...d}));
  const nodes = data.nodes.map(d => ({...d}));

  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("collide", d3.forceCollide())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

  simulation.force("collide")
        .strength(.7)
        .radius(d => Math.sqrt(d.size) + 5)
        .iterations(1);

  // Create the SVG container.
  const svg = d3.select("#graph")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a line for each link, and a circle for each node.
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
      .attr("stroke-width", 1);

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll()
    .data(nodes)
    .join("g");
    
  node
    .append("image")
    .attr("xlink:href", (d) => d.group < 4 ? \`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/\${d.id}\` : null) // Set the image URL based on your data
    .attr("x", (d) => -Math.sqrt(d.size) - 5)
    .attr("y", (d) => -Math.sqrt(d.size) - 5)
    .attr("clip-path", d => \`circle(\${Math.sqrt(d.size) + 5}px at \${Math.sqrt(d.size) + 5} \${Math.sqrt(d.size) + 5})\`)
    .attr("width", (d) => 2 * Math.sqrt(d.size) + 10);

  node
    .append("circle")
    .attr("r", d => Math.sqrt(d.size) + 5)
    .attr("fill", d => d.group < 4 ? "none" : color(d.group));

  node.append("title")
      .text(d => house(d.group) + d.id + ' ' + d.size);

  // Add a drag behavior.
  node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  node.on("mouseover", handleMouseOver)
     .on("mouseout", handleMouseOut)
     .on("click", handleMouseClick);

  function handleMouseClick(e) {
    const d = e.target.__data__;
    window.top.postMessage(d.id, "*");
  }

  function handleMouseOver(d) {
    d = d.target.__data__;
    // Highlight connected edges
    link.attr("stroke-opacity", e => (e.source === d || e.target === d) ? 1 : 0.1);
    // link.each(function (e) {
    //     if (e.source === d || e.target === d) {
    //       d3.select(this)
    //         .attr("stroke-opacity", 1)
    //         .attr("stroke", "#0d6efd")
    //         .attr("stroke-width", 2)
    //         .raise();
    //     }
    // });

    // Highlight connected nodes
    node.attr("opacity", function (n) {
        return n === d || isConnected(d, n) ? 1: 0.3;
    });
}

function handleMouseOut() {
  if (dragIsOn) {
    return;
  }
    // Reset edge and node styles
    link
      .attr("stroke-opacity", 0.6);
    node.attr("opacity", 1);
}

function isConnected(a, b) {
    // Check if two nodes are connected
    return links.some(function (link) {
        return (link.source === a && link.target === b) || (link.source === b && link.target === a);
    });
}

  // Set the position attributes of links and nodes each time the simulation ticks.
  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    // node
    //     .attr("x", d => d.x)
    //     .attr("y", d => d.y);

    node.attr("transform", d => \`translate(\${d.x}, \${d.y})\`)
  }

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    dragIsOn = true;
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
    dragIsOn = false;
    handleMouseOut();
  }

  // When this cell is re-run, stop the previous simulation. (This doesn’t
  // really matter since the target alpha is zero and the simulation will
  // stop naturally, but it’s a good practice.)
  // invalidation.then(() => simulation.stop());

  return simulation;
};

let simulation = null;

window.addEventListener("message", (event) => {
  if (simulation) {
    simulation.stop();
    d3.select("#graph").selectAll("*").remove();
  }
  if (event.data) {
    simulation = run(event.data);
  }
});

</script>
`;

const [onMessage] = useState(() => {
  return (data) => {
    if (data) {
      setSelectedAccountId(data);
    }
  };
});

return (
  <div>
    <div>
      <iframe
        className="w-100 h-100"
        style={{ minHeight: "800px" }}
        srcDoc={code}
        message={message}
        onMessage={onMessage}
      />
    </div>
    <div>
      <Widget
        src="nearukraineguild.near/widget/elections"
        props={{ accountId: selectedAccountId }}
      />
    </div>
  </div>
);
