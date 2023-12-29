const row = document.querySelector("tbody");
let contentHTML = "";
let count = 1;

profiles.forEach((profile) => {
  contentHTML += `<tr>
    <th scope="row">${count}</th>
    <td>
      <img src="${profile.imageUrl}" class="rounded" />
    </td>
    <td>
      <a class="link-underline link-underline-opacity-0" href="${profile.url}" target="_blank" rel="noopener noreferrer">
        ${profile.title}
      </a>
    </td>
  </tr>`;
  count++;
});

row.innerHTML = contentHTML;
