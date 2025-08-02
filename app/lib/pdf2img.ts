export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    if (typeof window === "undefined") {
        return {
            imageUrl: '',
            file: null,
            error: 'PDF conversion must be done in the browser',
        };
    }


    try {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const scale = 2.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context!,
            viewport,
        }).promise;

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const imageFile = new File([blob], `${file.name.replace(/\.pdf$/i, '')}.png`, {
                        type: 'image/png',
                    });

                    resolve({
                        imageUrl: URL.createObjectURL(blob),
                        file: imageFile,
                    });
                } else {
                    resolve({
                        imageUrl: '',
                        file: null,
                        error: 'Failed to create image blob',
                    });
                }
            }, 'image/png');
        });
    } catch (err) {
        console.error('PDF conversion error:', err);
        return {
            imageUrl: '',
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}
