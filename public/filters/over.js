
// 90%
if (stats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer - stats.Domaci.streleneGoly_Doma < 0.55) {
    continue;
}

if (stats.Domaci.streleneGoly_Doma < 1.2) {
    continue;
}

switch (true) {
    case stats.filterDataBy_Vincent < 1.5:
        continue;
}

// 92%
if (stats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer - stats.Domaci.streleneGoly_Doma < 0.8) {
    continue;
}