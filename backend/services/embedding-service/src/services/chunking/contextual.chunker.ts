export const contextualChunk = (document: string) => {
    // dividing all sections into chunks of 800 characters, ensuring that sentences are not split in the middle
  const sections = document.split(/\n#{1,3} |\n[A-Z][A-Z ]+\n/);
    const chunks: string[] = [];
    for (const section of sections) {
        const sentences = section.split(". ");
        let buffer = "";
        for (const sentence of sentences) {
            buffer += sentence + ". ";
            if (buffer.length > 800) {
                chunks.push(buffer.trim());
                buffer = "";
            }
        }
        if (buffer) chunks.push(buffer)
    }
    return chunks;
}