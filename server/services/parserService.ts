import * as pdfModule from 'pdf-parse';
import mammoth from 'mammoth';

export interface ParseResult {
  text: string;
  charCount: number;
  wordCount: number;
  isReadable: boolean;
  error?: string;
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  // Method 1: Modern PDFParse class
  try {
    const { PDFParse } = pdfModule as any;
    if (PDFParse) {
      const parser = new PDFParse({ data: buffer });
      if (typeof parser.load === 'function') {
        await parser.load();
      }
      if (typeof parser.getText === 'function') {
        const textResult = await parser.getText();
        if (typeof textResult === 'string' && textResult.trim().length > 0) {
          return textResult;
        }
        if (textResult?.text && typeof textResult.text === 'string') {
          return textResult.text;
        }
      }
    }
  } catch (err) {
    console.warn('PDFParse class extraction attempt failed, trying alternate:', err);
  }

  // Method 2: Default function export if present
  try {
    const fn = (pdfModule as any).default || (pdfModule as any);
    if (typeof fn === 'function') {
      const result = await fn(buffer);
      if (result?.text) {
        return result.text;
      }
    }
  } catch (err) {
    console.warn('Fallback pdf-parse function failed:', err);
  }

  // Method 3: Text stream extraction from raw buffer
  try {
    const raw = buffer.toString('latin1');
    const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
    let match;
    const extractedParts: string[] = [];
    while ((match = streamRegex.exec(raw)) !== null) {
      const streamData = match[1];
      // Keep printable ASCII lines
      const clean = streamData.replace(/[^\x20-\x7E\r\n]/g, ' ').replace(/\s+/g, ' ').trim();
      if (clean.length > 20) {
        extractedParts.push(clean);
      }
    }
    if (extractedParts.length > 0) {
      return extractedParts.join('\n');
    }
  } catch {}

  return '';
}

export async function parseResumeFile(
  buffer: Buffer,
  mimeType: string,
  originalName: string
): Promise<ParseResult> {
  const extension = originalName.split('.').pop()?.toLowerCase() || '';
  let rawText = '';

  try {
    if (
      mimeType === 'application/pdf' ||
      extension === 'pdf'
    ) {
      rawText = await extractPdfText(buffer);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword' ||
      extension === 'docx' ||
      extension === 'doc'
    ) {
      const docxResult = await mammoth.extractRawText({ buffer });
      rawText = docxResult.value || '';
    } else if (
      mimeType === 'text/plain' ||
      extension === 'txt' ||
      mimeType.startsWith('text/')
    ) {
      rawText = buffer.toString('utf-8');
    } else {
      // Try PDF first, then fallback to text
      rawText = await extractPdfText(buffer);
      if (!rawText || rawText.trim().length < 30) {
        rawText = buffer.toString('utf-8');
      }
    }

    // Clean up extracted text
    const cleanedText = rawText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\0/g, '') // remove null characters
      .replace(/[ \t]+/g, ' ')
      .trim();

    const charCount = cleanedText.length;
    const wordCount = cleanedText ? cleanedText.split(/\s+/).length : 0;

    // Minimum meaningful resume text check
    if (charCount < 40 || wordCount < 10) {
      return {
        text: '',
        charCount,
        wordCount,
        isReadable: false,
        error: 'The uploaded file contains insufficient readable text. If this is a scanned image or photo PDF, please upload a text-based PDF or DOCX file.',
      };
    }

    return {
      text: cleanedText,
      charCount,
      wordCount,
      isReadable: true,
    };
  } catch (err: any) {
    console.error('Error in parseResumeFile:', err);
    return {
      text: '',
      charCount: 0,
      wordCount: 0,
      isReadable: false,
      error: `Could not parse file (${err?.message || 'Unsupported or corrupted document format'}).`,
    };
  }
}
