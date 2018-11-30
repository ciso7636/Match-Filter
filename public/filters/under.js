// 93%
if (stats instanceof Object === false) continue;

switch (true) {
    case stats.Domaci.cisteKontoDoma <= 30 || stats.Hostia.cisteKontoVonku <= 30:
    case Math.abs(stats.Domaci.cisteKontoDoma - stats.Hostia.cisteKontoVonku) > 40:
        continue;
}

if (Math.abs(stats.Domaci.posledne_4_Zapasy.streleneGolyPriemer - stats.Domaci.streleneGoly_Doma) < 0.3 &&
    stats.priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia < 1.3
) {
    continue;
}

switch (true) {
    case stats.filterDataBy_Yuvalfra > 2.2: // 1.8 = 100% - under1.5 / 75% - under2.5, | | | | 1.5 = 100% - under1.5 / 100% - under2.5
    case stats.filterDataBy_JohnHaighsTable < 68:
    case stats.filterDataBy_Vincent > 1:
        continue;
}