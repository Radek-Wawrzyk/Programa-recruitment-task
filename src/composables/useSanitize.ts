import DOMPurify from 'dompurify'

const useSanitize = () => {
  const sanitize = (html: string) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'ul',
        'li',
        'ol',
        'a',
        'img',
        'blockquote',
        'code',
        'pre',
        'hr',
        'table',
        'tbody',
        'thead',
        'tfoot',
        'tr',
        'td',
        'th',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'width', 'height', 'class', 'style'],
    })
  }

  return { sanitize }
}

export { useSanitize }
