let selectedText = ''

function handleSelectedText() {
  if (window) selectedText = window.getSelection()!.toString().trim()
}

document.addEventListener('mouseup', handleSelectedText)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSelectedText') {
    sendResponse(selectedText)
  }
})

function countElements() {
  const elements = document.querySelectorAll('*')
  return elements.length
}

function displayElementCount() {
  const elementCount = countElements()
  console.log(`Number of elements in the Full Article DOM: ${elementCount}`)
}

displayElementCount() // Call the function to display the count
//jig-ncbiinpagenav

// content-script.js
function extractTextRecursively(element: HTMLElement) {
  let extractedText = ''

  for (const child of element.children) {
    if (child.tagName === 'P' || child.tagName.startsWith('H')) {
      //extractedText += child.textContent.trim() + "\n";
      extractedText += '\n' + child.textContent
    } else {
      extractedText += extractTextRecursively(child as HTMLElement)
    }
  }
  console.log(extractedText)
  return extractedText
}

function extractTextFromPage() {
  const mainContent = document.querySelector('.jig-ncbiinpagenav')!.cloneNode(true) as HTMLElement // Replace with appropriate selector
  if (!mainContent) {
    return 'Article not found'
  }

  const extractedText = extractTextRecursively(mainContent)
  return extractedText
}

// content-script.js
function isTextHighlighted() {
  const selection = window.getSelection()
  return !selection!.isCollapsed // Returns true if text is highlighted, false otherwise
}

console.log('Extracted Text:', extractTextFromPage())

export {}
