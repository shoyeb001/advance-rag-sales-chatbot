import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
export async function loadPDFBuffer(buffer: Buffer) {

    const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(buffer)
    }).promise;

    const pages: { content: string; page: number }[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

        const page = await pdf.getPage(pageNum);

        const textContent = await page.getTextContent();

        const text = textContent.items
            .map((item: any) => item.str)
            .join(" ");

        pages.push({
            content: text,
            page: pageNum
        });

    }

    return pages;
}
