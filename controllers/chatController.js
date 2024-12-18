import { pool, openai } from '../config/index.js';

export const handleChat = async (req, res) => {
  // const { message } = req.body;

  try {
    //   // 1. Analiza el mensaje del usuario con OpenAI
    //   const openaiResponse = await openai.chat.completions.create({
    //     model: 'gpt-4o',
    //     messages: [{ role: 'user', content: message }],
    //     max_tokens: 150,
    //     temperature: 0.7,
    //   });

    // const chatbotIntent = openaiResponse.data.choices[0].message.content;
    const chatbotIntent = '¿Me puedes recomendar sobre libros infantiles?';
    // const chatbotIntent = 'Muestrame libros del autor KOYOHARU GOTOUGE';

    // 2. Decide qué consulta ejecutar en la base de datos
    let queryText = '';
    let responseText = '';
    let authorName = '';

    if (
      chatbotIntent.includes('recomendar') &&
      chatbotIntent.includes('libros infantiles')
    ) {
      queryText =
        "SELECT book.title, book.url_image, book.price, book.slug, author.name FROM book INNER JOIN category_book ON book.id_category_book=category_book.id INNER JOIN book_author ON book.id=book_author.id_book INNER JOIN author ON book_author.id_author=author.id WHERE category_book.name = 'libros infantiles' LIMIT 3";
    } else if (chatbotIntent.includes('autor')) {
      authorName = chatbotIntent.split('autor')[1].trim().toLowerCase(); // Extrae el nombre del autor
      queryText = `SELECT book.title FROM book 
	      INNER JOIN book_author ON book.id=book_author.id_book 
	      INNER JOIN author ON book_author.id_author=author.id
	      WHERE author.name='${authorName}'`;
    }

    // 3. Ejecuta la consulta en la base de datos
    if (queryText) {
      const result = await pool.query(queryText);
      if (result.rows.length > 0) {
        responseText = chatbotIntent.includes('autor')
          ? (responseText =
              `Los libros de ${authorName} son : ` +
              result.rows.map((book) => book.title).join(', '))
          : `Te recomiendo estos libros: ${result.rows
              .map((book) => `${book.title} de ${book.name}`)
              .join(', ')}`;
      } else {
        responseText = 'No encontré resultados para tu búsqueda.';
      }
    } else {
      responseText =
        'Lo siento, no pude entender tu solicitud. ¿Puedes reformularla?';
    }
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error en el chatbot:', error);
    res.status(500).json({
      error: 'Hubo un problema con el chatbot. Intenta de nuevo más tarde.',
    });
  }
};
