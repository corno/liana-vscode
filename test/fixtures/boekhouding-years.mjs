import { readFileSync } from 'node:fs'

const base = readFileSync(new URL('boekhouding.lna', import.meta.url), 'utf8')
const purchase = (type, handling, document) => `<
    ${handling} 'kwartaal' ${document} "2025-03-01"
    {
        'kostenregel': < | \`Bekend\` < 21.00 121.00 > "Kosten" | \`Kosten\` < 'advieskosten' > >
        'balansregel': < | \`Bekend\` < 0.00 10.00 > "Voorraad" | \`Balans\` < 'voorraad' > >
    }
    ${type}
>`
const sale = (contract, lines, handling) => `<
    ${handling} 30 'kwartaal' | \`Toegevoegd\` < "verkoop.pdf" >
    'klant' ${contract} "2025-03-02" { ${lines} }
>`
const saleLine = (vat, contract, type) =>
    `< ${vat} 100.00 ${contract} "Verkoop" ${type} >`
const year = previous => `<
    | \`Nee\` ~ "2025-01-01"
    < { 'bank': <> 'krediet': <> } { 'advieskosten': <> 'verkopen': <> } >
    ${previous ? '| `Nee` < \'2024\' >' : '| `Ja` ~'}
    <
        < 'advieskosten' { 'maart': ~ }
            {
                'kwartaal': < { 'standaard': ~ } { 'aangifte': < "btw.pdf" > } "BTW"
                    | \`Aangegeven\` < 0.00 21.00 "2025-04-01" > >
                'open': < { 'vrijgesteld': ~ } {} "Nog open" | \`Openstaand\` ~ >
            }
        >
        < 'bank' 'bank' 'bank' 'bank' 'bank' 0.00 0.00
            { 'zakelijk': < 0.00 'bank'
                ${previous ? '| `Nee` < \'zakelijk\' >' : '| `Ja` ~'}
                {
                    'betaling': < 121.00 "2025-03-01" "Betaling" >
                    'ontvangst': < 100.00 "2025-03-02" "Ontvangst" >
                    'btw': < 21.00 "2025-04-01" "BTW" >
                    'prive': < 10.00 "2025-03-03" "Prive" >
                    'verrekening': < 10.00 "2025-03-04" "Verrekening" >
                    'vorig': < 10.00 "2025-03-05" "Vorig jaar" >
                }
            > }
            { 'prive': < 0.00 'bank'
                ${previous ? '| `Nee` < \'prive\' >' : '| `Ja` ~'} > }
            { 'voorraad': < 0.00 'bank'
                ${previous ? '| `Nee` < \'voorraad\' >' : '| `Ja` ~'} > }
            { 'verrekening': ~ }
        >
    >
    <
        {
            'factuur': ${purchase('| `Inkoop (met crediteur)` < \'leverancier\' "INV-1" >',
                '| `Mutaties` ~', '| `Toegevoegd` < "inkoop.pdf" >')}
            'bon': ${purchase('| `Bonnetje` ~', '| `Nog te betalen` < 30 >', '| `Ontbreekt` ~')}
            'loonheffing': ${purchase('| `Loonheffing` < \'maart\' >',
                '| `Rekening courant` < \'prive\' >', '| `Niet van toepassing` ~')}
            'salaris': ${purchase('| `Salaris` < \'maart\' \'medewerker\' >',
                '| `Mutaties` ~', '| `Toegevoegd` < "salaris.pdf" >')}
        }
        {
            'projectfactuur': ${sale('| `Project` < \'project\' \'offerte\' >', `
                'standaard': ${saleLine('| `Standaard` < \'standaard\' >', '| `Project` < \'mijlpaal\' >',
                    '| `Opbrengsten` < \'verkopen\' >')}
                'los': ${saleLine('| `Intracommunautair` ~', '| `Los` ~', '| `Balans` < \'voorraad\' >')}
            `, '| `Mutaties` ~')}
            'licentiefactuur': ${sale('| `Licentieovereenkomst` < \'licentie\' >', `
                'periode': ${saleLine('| `Binnenland: heffing verlegd` ~', '| `Licentieovereenkomst` < \'periode\' >',
                    '| `Opbrengsten` < \'verkopen\' >')}
            `, '| `Rekening courant` < \'prive\' >')}
        }
    >
    <
        { 'verrekening': < {
            'resultaat': < 121.00 | \`Resultaat\` < _ | \`Inkoop\` 'factuur' > >
            'balans': < 10.00 | \`Balans\` | \`Informele rekening\` < 'prive' > >
        } > }
        { 'zakelijk': < {
            'betaling': < | \`Resultaat\` < _ | \`Inkoop\` 'factuur' > >
            'ontvangst': < | \`Resultaat\` < _ | \`Verkoop\` 'projectfactuur' > >
            'btw': < | \`Resultaat\` < _ | \`BTW-periode\` 'kwartaal' > >
            'prive': < | \`Balans\` | \`Informele rekening\` < 'prive' > >
            'verrekening': < | \`Balans\` | \`Verrekenpost\` < 'verrekening' > >
            'vorig': < | \`Resultaat\` < ${previous ? "* '2024'" : '_'} | \`Verkoop\` 'licentiefactuur' > >
        } > }
        { 'voorraad': < { 'boeking': < 10.00 "2025-03-01" "Boeking" 'advieskosten' > } > }
    >
>`

const management = base.replace(
    '        {}\n        {}\n        {}\n        {}\n',
    `        { 'gebruiker': < "Gebruiker" "test-only" > }
        {
            'klant': <
                { 'licentie': < { 'periode': < 100.00 > } > }
                { 'project': < { 'offerte': < { 'mijlpaal': < | \`Project\` < 100.00 "2025-03-02" > > } > } > }
            >
            'andere klant': <
                { 'andere licentie': < { 'andere periode': < 200.00 > } > }
                { 'ander project': < { 'andere offerte': < { 'andere mijlpaal': < | \`Project\` < 200.00 "2025-03-02" > > } > } > }
            >
        }
        { 'leverancier': ~ }
        { 'medewerker': ~ }
`,
)
if (management === base) throw new Error('Boekhouding management fixture layout changed')
export const boekhoudingYears = management.replace('`Jaren`: {}',
    `\`Jaren\`: { '2024': ${year(false)} '2025': ${year(true)} }`)
