const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const path = require('path');
const fs = require('fs');

const contractController = {
    generateContract: async (req, res, next) => {
        try {
            const { firmName, firmAddress, firmPhone, firmCF, firmRC, firmBankAccount, firmBankName,
                productName,quantity,price,producerId,companyId } = req.body;

            const doc = new PDFDocument({ font: 'Times-Roman' });

            let fileName = `contract-${Date.now()}.pdf`;
            let filePath = path.resolve(__dirname, `../documents/companyContracts/${fileName}`);

            doc.pipe(fs.createWriteStream(filePath));
            const stream = doc.pipe(blobStream());

            doc.fontSize(25).text('Contract de Vanzare-Cumparare', { align: 'center' });
            doc.moveDown(1);

            // ... Mai multă generare a documentului PDF
            doc.fontSize(14).text(`Incheiat intre:`, { align: 'left' });
            doc.moveDown(1);
            doc.text(`S.C. ${firmName} cu sediul la adresa ${firmAddress}. tel./fax ${firmPhone} CF ${firmCF} RC ${firmRC} cont nr. ${firmBankAccount} deschis la Banca ${firmBankName}, denumita in prezentul contract VANZATOR si`, { align: 'left' });
            doc.moveDown(1);
            doc.text(`S.C. ……………………………………  cu sediul in …………………………………… str. ………………… nr…….. tel./fax ………………… CF ………………… RC ………………… cont nr. …………………………………… deschis la Banca …………………, denumita in prezentul contract CUMPARATOR.`, { align: 'left' });
            doc.moveDown(2);

            doc.text('1. OBIECTUL CONTRACTULUI', { underline: true });
            doc.moveDown(1);
            doc.text(`1.1. Obiectul contractului este vanzarea-cumpararea de ${quantity} KG de ${productName}.`);
            doc.moveDown(1);
            doc.text(`1.2. Partile contractante sunt de acord ca VANZATORUL sa vanda si CUMPARATORUL sa cumpere produsul ${productName} conform celor specificate in ANEXA nr.1 la preturile, cantitatile, conditiile de livrare si de plata convenite prin prezentul contract.`);
            doc.moveDown(1);
            doc.text('1.3. Preturile din ANEXA nr. 1 sunt exprimate in RON iar plata se face in lei. La aceste preturi se aplica TVA.');
            doc.moveDown(1);
            doc.text('1.4. Marfa care face obiectul prezentului contract ramane proprietatea VANZATORULUI pana la achitarea ei integrala de catre CUMPARATOR.');
            doc.moveDown(2);

            doc.text('2. CONDITII DE LIVRARE', { underline: true });
            doc.moveDown(1);
            doc.text(`2.1. Marfa se livreaza de catre VANZATOR la CUMPARATOR.`);
            doc.moveDown(2);

            doc.text('3. VALOAREA CONTRACTULUI', { underline: true });
            doc.moveDown(1);
            doc.text(`3.1. Valoarea totala a contractului este de ${price} RON fara TVA pret ferm.`);
            doc.moveDown(2);

            doc.text('4. CONDITII DE PLATA', { underline: true });
            doc.moveDown(1);
            doc.text('4.1. CUMPARATORUL va oferi suma de bani VANZATORULUI sub forma de numerar fie va achita in contul vanzatorului prin Ordin de Plata sau Fila Cec suma aferenta produselor vandute.');
            doc.moveDown(1);
            doc.text('4.2. Daca CUMPARATORUL renunta la contract din motive imputabile lui atunci el va renunta la marfa care face obiectul prezentului contract si la suma achitata VANZATORULUI.');
            doc.moveDown(2);

            doc.text('5. OBLIGATIILE VANZATORULUI', { underline: true });
            doc.moveDown(1);
            doc.text('5.1. Sa anunte CUMPARATORUL cu cel putin 3 zile lucratoare inainte de sosirea marfii.');
            doc.moveDown(1);
            doc.text('5.2. Sa asigure CUMPARATORULUI livrarea marfii conform specificatiei din ANEXA nr.1.');
            doc.moveDown(1);
            doc.text('5.3. Sa asigure la cererea CUMPARATORULUI transportul produselor.');
            doc.moveDown(2);

            doc.text('6. OBLIGATIILE CUMPARATORULUI', { underline: true });
            doc.moveDown(1);
            doc.text('6.1. Sa achite VANZATORULUI contravaloarea marfii in conditiile prevazute la pct.4.');
            doc.moveDown(1);
            doc.text('6.2. Sa asigure depozitarea manipularea produselor in conditiile prevazute in specificatia tehnica primita de la VANZATOR.');
            doc.moveDown(2);

            doc.text('8. FORTA MAJORA', { underline: true });
            doc.moveDown(1);
            doc.text('8.1. Forta majora exonereaza de raspundere partea care o invoca in conditiile legii cu cerinta notificarii scrise prealabil in termen de 7 zile de la aparitia cazului de forta majora.');
            doc.moveDown(2);

            doc.text('9. LITIGII', { underline: true });
            doc.moveDown(1);
            doc.text('9.1. Eventualele litigii in derularea prezentului contract vor fi rezolvate pe cale amiabila. In situatia in care acest lucru nu este posibil, litigiul va fi supus arbitrajului Camerei de Comert si Industrie a Romaniei sau va fi solutionat potrivit normelor de drept comun.');
            doc.moveDown(2);

            doc.text('10. DISPOZITII FINALE', { underline: true });
            doc.moveDown(1);
            doc.text('10.1. Modificarea termenilor prezentului contract de catre ambele parti este posibila numai prin act aditional.');
            doc.moveDown(1);
            doc.text('10.2. ANEXA nr.1 face parte din prezentul contract de vanzare-cumparare.');
            doc.moveDown(1);
            doc.text('10.3. Contractul poate fi reziliat numai cu acordul scris al ambelor parti.');
            doc.moveDown(1);
            doc.text('10.4. Contractul intra in vigoare de la data semnarii sale de catre VANZATOR si CUMPARATOR.');
            doc.moveDown(1);
            doc.text('10.5. Prezentul contract s-a incheiat azi _____________  in doua exemplare, cate unul pentru fiecare parte contractanta, ambele cu valoare de original.');
            doc.moveDown(2);

            doc.text('VANZATOR                                   CUMPARATOR', { align: 'left' });
            doc.moveDown(1);
            doc.text(`S.R.L.  _______________                           S.C. ${firmName}`, { align: 'left' });
            doc.text('Director______________________           Director______________________ ', { align: 'left' });
            doc.text('Semnatura :                                            Semnatura : ', { align: 'left' });
            doc.text('______________________                        ______________________');
            doc.moveDown(1);
            doc.text('Data semnarii: ____________                Data semnarii: ____________', { align: 'left' });


            doc.end();

            stream.on('finish', async function () {
                const blob = stream.toBlob('application/pdf');
                const arrayBuffer = await blob.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                req.contractBuffer = buffer;
                next();
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Eroare de la server!" });
        }
    }
}

module.exports = contractController;
