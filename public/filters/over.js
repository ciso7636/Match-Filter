
// 88% - over1.5
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

// 92% - over1.5
if (stats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer - stats.Domaci.streleneGoly_Doma < 0.85) { //  1.06 = 100% - over1.5
    continue;
}

// 91% - over1.5 / 83% - over2.5
if (stats.Domaci.streleneGoly_Doma < 1.2) { // 1.8 = 90% - over1.5 / 85% - over2.5
    continue;
}

switch (true) {
    case stats.Domaci.cisteKontoDoma >= 35 || stats.Hostia.cisteKontoVonku >= 32:
    case stats.Hostia.cisteKontoVonku >= 40 && Math.abs(stats.Hostia.cisteKontoVonku - stats.Domaci.cisteKontoDoma) < 15:
    case stats.Hostia.cisteKontoVonku >= 45 && Math.abs(stats.Hostia.cisteKontoVonku - stats.Domaci.cisteKontoDoma) < 20:
    case stats.Hostia.cisteKontoVonku >= 50 && Math.abs(stats.Hostia.cisteKontoVonku - stats.Domaci.cisteKontoDoma) < 25:
        continue;
}

switch (true) {
    case stats.priemer_StrelenéGólyDomáci_InkasovaneGólyHostia < 1.4:
    case stats.priemer_StrelenéGólyHostia_InkasovaneGólyDomáci < 1.25:
        continue;
}

switch (true) {
    case stats.priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia < 1.3:
    case stats.priemer_posledne4Zapasy_StrelenéGólyHostia_InkasovaneGólyDomáci < 1.2:
        continue;
}

switch (true) {
    case stats.filterDataBy_Yuvalfra < 2:
    case stats.filterDataBy_JohnHaighsTable > 33:
    case stats.filterDataBy_Vincent < 1.5:
        continue;
}

// 60% - over3.5
switch (true) {
    case stats.filterDataBy_Yuvalfra < 3.8:
    case stats.filterDataBy_JohnHaighsTable > 33:
    case stats.filterDataBy_Vincent < 3:
        continue;
}