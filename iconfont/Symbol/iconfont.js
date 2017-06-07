;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-NO" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M315.334 478.652l-189.569 346.79 165.438-23.916 69.17 152.162 189.574-346.791z" fill="#D32A2A" ></path>' +
    '' +
    '<path d="M719.193 478.652l189.57 346.79-165.439-23.916-69.171 152.162L484.58 606.897z" fill="#D32A2A" ></path>' +
    '' +
    '<path d="M517.264 70.757c9.442 0 18.008 18.436 27.248 19.231 9.386 0.813 20.993-15.86 30.134-14.252 9.274 1.616 14.521 21.262 23.501 23.656 9.084 2.429 23.423-11.962 32.16-8.781 8.834 3.207 10.554 23.458 18.998 27.407 8.496 3.967 25.134-7.701 33.207-3.034 8.116 4.693 6.283 24.944 13.933 30.303 7.658 5.376 26.076-3.232 33.225 2.775 7.165 6.024 1.866 25.644 8.479 32.256 6.604 6.604 26.224 1.305 32.247 8.47 6.008 7.157-2.602 25.566 2.774 33.233 5.359 7.641 25.61 5.817 30.304 13.924 4.667 8.073-7.01 24.711-3.043 33.207 3.95 8.444 24.209 10.165 27.416 18.989 3.189 8.738-11.219 23.085-8.781 32.169 2.395 8.98 22.031 14.218 23.656 23.492 1.599 9.145-15.074 20.752-14.262 30.139 0.796 9.239 19.231 17.805 19.231 27.243 0 9.438-18.436 18.012-19.231 27.243-0.813 9.387 15.86 20.994 14.253 30.139-1.616 9.274-21.262 14.512-23.656 23.492-2.429 9.084 11.962 23.432 8.781 32.17-3.206 8.824-23.466 10.553-27.416 18.998-3.958 8.496 7.71 25.133 3.043 33.205-4.693 8.107-24.944 6.283-30.312 13.924-5.367 7.668 3.232 26.078-2.766 33.225-6.016 7.166-25.645 1.867-32.257 8.479-6.611 6.613-1.305 26.232-8.479 32.248-7.148 6.008-25.558-2.592-33.225 2.775-7.641 5.367-5.816 25.617-13.924 30.303-8.081 4.666-24.711-7.002-33.207-3.035-8.444 3.941-10.164 24.201-18.989 27.408-8.737 3.18-23.085-11.211-32.174-8.791-8.976 2.404-14.213 22.041-23.487 23.674-9.141 1.6-20.752-15.082-30.139-14.27-9.235 0.795-17.805 19.23-27.243 19.23-9.442 0-18.008-18.436-27.248-19.23-9.386-0.813-20.994 15.861-30.134 14.262-9.274-1.625-14.517-21.262-23.496-23.666-9.079-2.42-23.427 11.971-32.175 8.791-8.82-3.215-10.544-23.467-18.988-27.408-8.492-3.967-25.135 7.701-33.207 3.035-8.111-4.693-6.283-24.945-13.928-30.313-7.662-5.367-26.076 3.232-33.229-2.773-7.166-6.016-1.863-25.637-8.475-32.248-6.608-6.611-26.229-1.314-32.252-8.471-6.003-7.156 2.602-25.566-2.771-33.232-5.363-7.648-25.614-5.826-30.308-13.934-4.662-8.072 7.01-24.709 3.043-33.205-3.945-8.436-24.201-10.164-27.412-18.99-3.18-8.738 11.215-23.086 8.791-32.161-2.398-8.98-22.045-14.227-23.67-23.492-1.599-9.145 15.078-20.752 14.266-30.139-0.795-9.239-19.23-17.805-19.23-27.243 0-9.447 18.436-18.013 19.23-27.252 0.813-9.386-15.864-20.994-14.266-30.139 1.629-9.265 21.271-14.512 23.67-23.492 2.424-9.075-11.971-23.423-8.786-32.169 3.211-8.825 23.466-10.545 27.411-18.989 3.968-8.497-7.705-25.134-3.037-33.207 4.692-8.116 24.943-6.284 30.307-13.924 5.376-7.667-3.229-26.076 2.774-33.233 6.016-7.165 25.64-1.867 32.252-8.479 6.612-6.604 1.31-26.224 8.475-32.248 7.151-5.999 25.562 2.602 33.228-2.766 7.646-5.367 5.822-25.618 13.93-30.311 8.076-4.667 24.71 7.009 33.206 3.042 8.44-3.95 10.165-24.201 18.989-27.416 8.738-3.181 23.086 11.219 32.166 8.79 8.979-2.394 14.217-22.04 23.491-23.665 9.14-1.599 20.753 15.074 30.139 14.261 9.237-0.795 17.806-19.23 27.245-19.23z" fill="#E2B700" ></path>' +
    '' +
    '<path d="M318.313 202.23c109.875-109.875 288.022-109.875 397.897 0 109.869 109.875 109.869 288.021 0 397.898-109.881 109.875-288.022 109.875-397.897 0-109.87-109.877-109.87-288.011 0-397.898z" fill="#FFD31A" ></path>' +
    '' +
    '<path d="M509.965 294.106h-0.712l-40.229 21.717-6.053-23.854 50.555-27.057h26.701v231.412h-30.262V294.106z" fill="#B67D1C" ></path>' +
    '' +
    '<path d="M542.439 498.537h-34.687V297.431l-40.176 21.688-7.176-28.283 52.57-28.136h29.469v235.837z m-30.262-4.425h25.836V267.125H514.08l-48.539 25.979 4.929 19.424 38.224-20.634h3.483v202.218z" fill="#B67D1C" ></path>' +
    '' +
    '<path d="M517.264 550.796l8.211 16.639 18.362 2.669-13.288 12.948 3.14 18.289-16.425-8.635-16.426 8.635 3.141-18.289-13.289-12.948 18.363-2.669zM435.024 529.854l1.759 16.456 14.56 7.882-15.109 6.76-2.99 16.283-11.102-12.281-16.41 2.186 8.25-14.356-7.147-14.928 16.197 3.407zM599.512 529.854l-1.768 16.456-14.555 7.882 15.108 6.76 2.986 16.283 11.107-12.281 16.413 2.186-8.254-14.356 7.148-14.928-16.197 3.407z" fill="#B67D1C" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-NO1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M318.601 479.35L133.288 818.355l161.722-23.377 67.62 148.747 185.318-339.006z" fill="#148C00" ></path>' +
    '' +
    '<path d="M713.397 479.35l185.314 339.005-161.723-23.377-67.62 148.747L484.05 604.719z" fill="#148C00" ></path>' +
    '' +
    '<path d="M515.999 80.614c9.229 0 17.603 18.02 26.634 18.802 9.177 0.792 20.527-15.509 29.459-13.935 9.067 1.584 14.195 20.782 22.976 23.127 8.881 2.366 22.898-11.693 31.439-8.588 8.635 3.137 10.313 22.93 18.572 26.796 8.302 3.877 24.571-7.535 32.461-2.97 7.931 4.586 6.144 24.388 13.616 29.631 7.488 5.252 25.493-3.168 32.481 2.709 7.003 5.878 1.823 25.066 8.29 31.527 6.452 6.462 25.634 1.282 31.522 8.275 5.872 7.004-2.543 24.993 2.709 32.486 5.243 7.483 25.034 5.69 29.626 13.611 4.561 7.9-6.853 24.169-2.976 32.476 3.861 8.244 23.669 9.922 26.801 18.552 3.116 8.546-10.97 22.574-8.582 31.454 2.339 8.775 21.538 13.893 23.122 22.96 1.563 8.942-14.732 20.292-13.94 29.463 0.776 9.036 18.802 17.405 18.802 26.629 0 9.234-18.025 17.614-18.802 26.64-0.792 9.172 15.503 20.521 13.935 29.454-1.578 9.067-20.787 14.194-23.127 22.97-2.377 8.881 11.693 22.909 8.582 31.444-3.132 8.631-22.939 10.318-26.801 18.573-3.866 8.306 7.541 24.575 2.977 32.465-4.587 7.921-24.383 6.139-29.632 13.612-5.247 7.493 3.158 25.492-2.704 32.475-5.878 7.004-25.065 1.824-31.532 8.286-6.462 6.463-1.276 25.649-8.285 31.528-6.988 5.867-24.988-2.533-32.481 2.709-7.468 5.253-5.686 25.045-13.611 29.62-7.9 4.564-24.154-6.837-32.461-2.96-8.254 3.856-9.938 23.659-18.562 26.796-8.541 3.106-22.569-10.964-31.455-8.599-8.771 2.346-13.893 21.543-22.96 23.148-8.932 1.553-20.287-14.748-29.459-13.956-9.031 0.782-17.405 18.802-26.634 18.802s-17.603-18.02-26.634-18.802c-9.176-0.792-20.527 15.509-29.458 13.945-9.067-1.595-14.189-20.792-22.971-23.138-8.875-2.365-22.903 11.705-31.449 8.599-8.625-3.147-10.308-22.939-18.567-26.796-8.301-3.877-24.57 7.524-32.46 2.96-7.932-4.586-6.144-24.378-13.617-29.631-7.488-5.241-25.488 3.169-32.481-2.709-7.004-5.879-1.819-25.055-8.286-31.527-6.457-6.462-25.639-1.283-31.528-8.276-5.868-6.993 2.543-24.992-2.709-32.485-5.242-7.483-25.035-5.701-29.625-13.622-4.56-7.891 6.853-24.159 2.976-32.465-3.856-8.245-23.659-9.934-26.795-18.563-3.111-8.536 10.959-22.564 8.593-31.435-2.345-8.775-21.553-13.913-23.143-22.97-1.558-8.932 14.742-20.282 13.95-29.454-0.782-9.036-18.802-17.405-18.802-26.64 0-9.234 18.02-17.603 18.802-26.639 0.792-9.171-15.508-20.521-13.95-29.463 1.595-9.057 20.798-14.185 23.143-22.961 2.366-8.869-11.704-22.897-8.593-31.443 3.142-8.63 22.939-10.318 26.8-18.563 3.877-8.307-7.535-24.576-2.97-32.465 4.586-7.932 24.383-6.149 29.625-13.611 5.258-7.494-3.158-25.493 2.709-32.486 5.884-7.004 25.066-1.824 31.533-8.286 6.461-6.462 1.277-25.639 8.28-31.527 6.994-5.868 24.993 2.543 32.486-2.71 7.473-5.243 5.69-25.044 13.617-29.62 7.895-4.565 24.154 6.848 32.46 2.97 8.249-3.866 9.937-23.659 18.562-26.806 8.542-3.106 22.57 10.964 31.444 8.598 8.776-2.345 13.898-21.542 22.965-23.137 8.932-1.563 20.287 14.737 29.458 13.945 9.032-0.779 17.407-18.799 26.635-18.799z" fill="#DD8E2F" ></path>' +
    '' +
    '<path d="M316.073 209.581c109.875-109.875 288.021-109.875 397.897 0 109.868 109.875 109.868 288.021 0 397.897-109.881 109.875-288.022 109.875-397.897 0-109.869-109.875-109.869-288.01 0-397.897z" fill="#FFA70B" ></path>' +
    '' +
    '<path d="M449.701 461.477c8.7 5.568 28.886 14.269 50.115 14.269 39.326 0 51.507-25.058 51.159-43.851-0.349-31.67-28.886-45.243-58.468-45.243h-17.053v-22.969h17.053c22.273 0 50.463-11.485 50.463-38.283 0-18.097-11.484-34.106-39.674-34.106-18.097 0-35.499 8.004-45.243 14.965l-8.005-22.273c11.833-8.701 34.802-17.401 59.164-17.401 44.547 0 64.732 26.45 64.732 53.943 0 23.318-13.921 43.155-41.763 53.248v0.696c27.842 5.568 50.463 26.45 50.463 58.12 0 36.194-28.189 67.864-82.481 67.864-25.405 0-47.679-8.004-58.815-15.313l8.353-23.666z" fill="#973F00" ></path>' +
    '' +
    '<path d="M500.164 503.123c-26.778 0-49.208-8.484-60.279-15.75l-1.748-1.147 10.168-28.811 2.834 1.814c7.483 4.79 27.288 13.848 48.677 13.848 16.431 0 29.104-4.423 37.666-13.145 7.075-7.208 11.021-17.409 10.825-27.989-0.346-31.466-30.275-42.624-55.8-42.624h-19.721v-28.305h19.721c19.212 0 47.795-9.485 47.795-35.615 0-19.686-13.834-31.438-37.006-31.438-17.3 0-34.349 7.794-43.692 14.468l-2.869 2.05-9.871-27.465 1.604-1.179c12.131-8.92 35.618-17.92 60.745-17.92 46.56 0 67.4 28.433 67.4 56.611 0 23.305-13.348 42.332-36.9 53.059 27.937 8.28 45.601 30.792 45.601 59.004 0 19.29-7.729 36.866-21.765 49.489-15.308 13.769-37.226 21.045-63.385 21.045z m-55.588-19.107c11.724 7.024 32.82 13.771 55.588 13.771 55.135 0 79.813-32.745 79.813-65.196 0-27.847-18.966-49.633-48.318-55.503l-2.145-0.429v-4.754l1.759-0.638c25.797-9.351 40.004-27.371 40.004-50.739 0-23.654-16.255-51.275-62.064-51.275-22.835 0-44.139 7.729-55.966 15.742l6.157 17.132c10.672-6.846 26.968-13.5 43.893-13.5 31.219 0 42.342 18.996 42.342 36.774 0 26.884-26.729 40.951-53.131 40.951h-14.385v17.633h14.385c27.959 0 60.747 12.54 61.136 47.881 0.222 11.982-4.28 23.583-12.354 31.806-9.604 9.783-23.557 14.743-41.474 14.743-20.282 0-39.252-7.723-48.682-12.982l-6.558 18.583z" fill="#973F00" ></path>' +
    '' +
    '<path d="M515.999 549.877l8.025 16.269 17.953 2.606-12.992 12.663 3.07 17.874-16.056-8.442-16.056 8.442 3.07-17.874-12.992-12.663 17.953-2.606zM435.606 529.407l1.721 16.081 14.231 7.714-14.768 6.607-2.924 15.916-10.854-12.007-16.04 2.136 8.061-14.029-6.983-14.591 15.831 3.326zM596.401 529.407l-1.729 16.081-14.227 7.714 14.769 6.607 2.918 15.916 10.86-12.007 16.045 2.136-8.072-14.029 6.988-14.591-15.832 3.326z" fill="#973F00" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-NO2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M311.026 476.17L122.985 820.166l164.103-23.727 68.615 150.943 188.05-343.999z" fill="#1A64AD" ></path>' +
    '' +
    '<path d="M711.632 476.17l188.047 343.996-164.115-23.727-68.604 150.943-188.049-343.999z" fill="#1A64AD" ></path>' +
    '' +
    '<path d="M511.33 71.562c9.367 0 17.86 18.288 27.029 19.079 9.307 0.804 20.823-15.734 29.887-14.143 9.201 1.607 14.415 21.088 23.319 23.47 9.011 2.403 23.235-11.871 31.896-8.717 8.768 3.186 10.47 23.274 18.846 27.188 8.429 3.934 24.938-7.641 32.943-3.009 8.049 4.653 6.229 24.742 13.813 30.062 7.604 5.335 25.879-3.208 32.964 2.755 7.107 5.97 1.852 25.432 8.408 31.989 6.546 6.557 26.016 1.301 31.991 8.402 5.954 7.102-2.58 25.361 2.75 32.967 5.319 7.583 25.402 5.769 30.066 13.812 4.622 8.011-6.959 24.517-3.024 32.943 3.924 8.373 24.018 10.079 27.19 18.833 3.173 8.672-11.126 22.902-8.704 31.912 2.369 8.908 21.85 14.105 23.468 23.301 1.586 9.074-14.954 20.585-14.15 29.897 0.782 9.167 19.067 17.661 19.067 27.023s-18.285 17.87-19.067 27.023c-0.804 9.312 15.736 20.827 14.14 29.898-1.607 9.198-21.088 14.396-23.468 23.303-2.411 9.008 11.866 23.243 8.704 31.91-3.173 8.754-23.277 10.467-27.19 18.846-3.924 8.426 7.646 24.93 3.015 32.938-4.653 8.043-24.737 6.231-30.057 13.812-5.33 7.604 3.204 25.866-2.75 32.957-5.965 7.106-25.435 1.854-31.991 8.41-6.567 6.56-1.301 26.021-8.418 31.989-7.086 5.959-25.351-2.573-32.954 2.752-7.583 5.325-5.774 25.411-13.813 30.056-8.016 4.633-24.514-6.942-32.943-3.006-8.375 3.908-10.078 24.005-18.835 27.183-8.661 3.162-22.896-11.115-31.917-8.715-8.905 2.38-14.098 21.86-23.299 23.483-9.063 1.581-20.58-14.959-29.887-14.155-9.169 0.788-17.662 19.073-27.029 19.073-9.365 0-17.862-18.285-27.026-19.073-9.312-0.804-20.829 15.731-29.897 14.15-9.196-1.618-14.394-21.099-23.304-23.479-9.005-2.4-23.235 11.877-31.912 8.715-8.751-3.184-10.459-23.274-18.841-27.183-8.423-3.937-24.927 7.639-32.938 3.006-8.048-4.652-6.229-24.741-13.817-30.063-7.599-5.325-25.863 3.207-32.959-2.753-7.107-5.967-1.851-25.429-8.408-31.988-6.557-6.557-26.016-1.304-31.992-8.402-5.954-7.097 2.581-25.36-2.744-32.965-5.32-7.588-25.414-5.779-30.067-13.822-4.627-8.009 6.954-24.512 3.014-32.938-3.908-8.369-24.002-10.082-27.185-18.836-3.157-8.669 11.125-22.902 8.72-31.902-2.379-8.907-21.871-14.116-23.478-23.303-1.586-9.071 14.954-20.586 14.15-29.898-0.793-9.167-19.079-17.661-19.079-27.023 0-9.37 18.285-17.865 19.079-27.032 0.804-9.312-15.737-20.823-14.15-29.897 1.618-9.188 21.099-14.394 23.478-23.303 2.406-9-11.876-23.235-8.72-31.907 3.188-8.754 23.277-10.464 27.19-18.835 3.939-8.426-7.641-24.938-3.009-32.943 4.653-8.045 24.742-6.234 30.062-13.814 5.331-7.604-3.204-25.865 2.755-32.959 5.964-7.107 25.429-1.854 31.991-8.411 6.552-6.554 1.295-26.016 8.402-31.989 7.097-5.954 25.361 2.581 32.965-2.747 7.583-5.325 5.774-25.414 13.812-30.064 8.017-4.629 24.515 6.948 32.943 3.014 8.371-3.913 10.084-24.007 18.835-27.19 8.672-3.154 22.902 11.123 31.907 8.72 8.905-2.382 14.103-21.863 23.298-23.48 9.068-1.586 20.585 14.957 29.903 14.153 9.16-0.792 17.663-19.08 27.022-19.08z" fill="#C6C6C6" ></path>' +
    '' +
    '<path d="M312.38 204.275c109.875-109.875 288.022-109.875 397.897 0 109.869 109.875 109.869 288.021 0 397.898-109.881 109.875-288.022 109.875-397.897 0-109.869-109.877-109.869-288.011 0-397.898z" fill="#DDDDDD" ></path>' +
    '' +
    '<path d="M436.646 493.701v-19.07l24.367-23.661c58.623-55.798 85.109-85.462 85.463-120.071 0-23.308-11.301-44.85-45.557-44.85-20.836 0-38.14 10.594-48.735 19.423l-9.888-21.896c15.892-13.419 38.493-23.308 64.979-23.308 49.441 0 70.276 33.902 70.276 66.745 0 42.378-30.724 76.633-79.105 123.249l-18.364 16.951v0.707h103.119v25.78H436.646z" fill="#7F7F7F" ></path>' +
    '' +
    '<path d="M585.91 496.409H433.939v-22.923l25.188-24.458c59.422-56.558 84.308-85.469 84.642-118.156 0-15.711-5.567-42.115-42.85-42.115-21.271 0-38.578 11.776-47.001 18.796l-2.735 2.279-12.195-27.004 1.563-1.319c18.287-15.442 41.984-23.947 66.726-23.947 50.417 0 72.983 34.882 72.983 69.453 0 44.726-33.13 80.103-79.934 125.199l-14.083 13h99.667v31.195z m-146.556-5.415h141.142v-20.365h-103.12v-4.6l19.235-17.755c45.791-44.121 78.234-78.671 78.234-121.26 0-29.541-17.696-64.038-67.569-64.038-22.76 0-44.573 7.575-61.661 21.371l7.597 16.823c11.068-8.599 27.627-17.829 47.707-17.829 30.673 0 48.264 17.334 48.264 47.558-0.37 36.308-27.918 66.46-86.303 122.032l-23.526 22.845v15.218z" fill="#7F7F7F" ></path>' +
    '' +
    '<path d="M511.33 547.735l8.149 16.504 18.214 2.65-13.188 12.843 3.12 18.141-16.295-8.564-16.291 8.564 3.114-18.141-13.177-12.843 18.211-2.65zM429.754 526.96l1.74 16.323 14.446 7.821-14.985 6.708-2.972 16.149-11.009-12.181-16.276 2.168 8.18-14.24-7.091-14.809 16.07 3.382zM592.919 526.96l-1.755 16.323-14.436 7.821 14.986 6.708 2.961 16.149 11.01-12.181 16.286 2.168-8.186-14.24 7.086-14.809-16.064 3.382z" fill="#7F7F7F" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wangguan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M0 0.008h1024v1023.984H0z" fill="#ffffff" ></path>' +
    '' +
    '<path d="M53.8 525.276l109.536 488.712h697.328l109.536-488.712-259.168 156.808-187.864-333.080-205.352 333.080z" fill="#F5A517" ></path>' +
    '' +
    '<path d="M625.832 298.852c0 58.944-47.744 106.656-106.672 106.656-58.912 0-106.656-47.712-106.656-106.656s47.744-106.656 106.656-106.656c58.936 0 106.672 47.72 106.672 106.656z" fill="#E6246B" ></path>' +
    '' +
    '<path d="M519.168 192.196c-58.912 0-106.656 47.712-106.656 106.656s47.744 106.656 106.656 106.656v-213.312z" fill="#FED716" ></path>' +
    '' +
    '<path d="M53.8 525.276l109.536 488.712h697.328z" fill="#F5A517" ></path>' +
    '' +
    '<path d="M970.2 525.276l-109.536 488.712h-697.328z" fill="#F5A517" ></path>' +
    '' +
    '<path d="M1014.648 496.412c0 0.012 0 0.026 0 0.040 0 30.486-24.714 55.2-55.2 55.2-0.023 0-0.045 0-0.068 0-0.004 0-0.012 0-0.021 0-30.477 0-55.184-24.707-55.184-55.184 0-0.020 0-0.039 0-0.059 0-0.014 0-0.033 0-0.053 0-30.477 24.707-55.184 55.184-55.184 0.008 0 0.017 0 0.025 0 0.018 0 0.040 0 0.063 0 30.486 0 55.2 24.714 55.2 55.2 0 0.014 0 0.028 0 0.042z" fill="#0067B3" ></path>' +
    '' +
    '<path d="M959.384 441.172c-0.007 0-0.016 0-0.024 0-30.477 0-55.184 24.707-55.184 55.184 0 0.020 0 0.039 0 0.059 0 0.014 0 0.033 0 0.053 0 30.477 24.707 55.184 55.184 55.184 0.008 0 0.017 0 0.025 0l-0.001-110.48z" fill="#FED716" ></path>' +
    '' +
    '<path d="M113.448 496.412c0 0.005 0 0.010 0 0.016 0 30.499-24.725 55.224-55.224 55.224-0.017 0-0.034 0-0.051 0-0.005 0-0.013 0-0.021 0-30.495 0-55.216-24.721-55.216-55.216 0-0.008 0-0.017 0-0.025 0-0.008 0-0.019 0-0.031 0-30.491 24.717-55.208 55.208-55.208 0.011 0 0.023 0 0.034 0 0.015 0 0.035 0 0.054 0 30.495 0 55.216 24.721 55.216 55.216 0 0.008 0 0.017 0 0.025z" fill="#0067B3" ></path>' +
    '' +
    '<path d="M58.176 441.172c-0.010 0-0.021 0-0.032 0-30.491 0-55.208 24.717-55.208 55.208 0 0.011 0 0.023 0 0.034 0 0.008 0 0.019 0 0.030 0 30.491 24.717 55.208 55.208 55.208 0.011 0 0.023 0 0.034 0l-0.002-110.48z" fill="#FED716" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wangguan-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M0 0.008h1024v1023.984H0z" fill="#ffffff" ></path>' +
    '' +
    '<path d="M53.8 525.276l109.536 488.712h697.328l109.536-488.712-259.168 156.808-187.864-333.080-205.352 333.080z" fill="#DBC7AE" ></path>' +
    '' +
    '<path d="M625.832 298.852c0 58.944-47.744 106.656-106.672 106.656-58.912 0-106.656-47.712-106.656-106.656s47.744-106.656 106.656-106.656c58.936 0 106.672 47.72 106.672 106.656z" fill="#FFA70B" ></path>' +
    '' +
    '<path d="M519.168 192.196c-58.912 0-106.656 47.712-106.656 106.656s47.744 106.656 106.656 106.656v-213.312z" fill="#DBC7AE" ></path>' +
    '' +
    '<path d="M53.8 525.276l109.536 488.712h697.328z" fill="#DBC7AE" ></path>' +
    '' +
    '<path d="M970.2 525.276l-109.536 488.712h-697.328z" fill="#DBC7AE" ></path>' +
    '' +
    '<path d="M1014.648 496.412c0 0.012 0 0.026 0 0.040 0 30.486-24.714 55.2-55.2 55.2-0.023 0-0.045 0-0.068 0-0.004 0-0.012 0-0.021 0-30.477 0-55.184-24.707-55.184-55.184 0-0.020 0-0.039 0-0.059 0-0.014 0-0.033 0-0.053 0-30.477 24.707-55.184 55.184-55.184 0.008 0 0.017 0 0.025 0 0.018 0 0.040 0 0.063 0 30.486 0 55.2 24.714 55.2 55.2 0 0.014 0 0.028 0 0.042z" fill="#148C00" ></path>' +
    '' +
    '<path d="M959.384 441.172c-0.007 0-0.016 0-0.024 0-30.477 0-55.184 24.707-55.184 55.184 0 0.020 0 0.039 0 0.059 0 0.014 0 0.033 0 0.053 0 30.477 24.707 55.184 55.184 55.184 0.008 0 0.017 0 0.025 0l-0.001-110.48z" fill="#DBC7AE" ></path>' +
    '' +
    '<path d="M113.448 496.412c0 0.005 0 0.010 0 0.016 0 30.499-24.725 55.224-55.224 55.224-0.017 0-0.034 0-0.051 0-0.005 0-0.013 0-0.021 0-30.495 0-55.216-24.721-55.216-55.216 0-0.008 0-0.017 0-0.025 0-0.008 0-0.019 0-0.031 0-30.491 24.717-55.208 55.208-55.208 0.011 0 0.023 0 0.034 0 0.015 0 0.035 0 0.054 0 30.495 0 55.216 24.721 55.216 55.216 0 0.008 0 0.017 0 0.025z" fill="#148C00" ></path>' +
    '' +
    '<path d="M58.176 441.172c-0.010 0-0.021 0-0.032 0-30.491 0-55.208 24.717-55.208 55.208 0 0.011 0 0.023 0 0.034 0 0.008 0 0.019 0 0.030 0 30.491 24.717 55.208 55.208 55.208 0.011 0 0.023 0 0.034 0l-0.002-110.48z" fill="#DBC7AE" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wangguan-copy-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M0 0.008h1024v1023.984H0z" fill="#ffffff" ></path>' +
    '' +
    '<path d="M53.8 525.276l109.536 488.712h697.328l109.536-488.712-259.168 156.808-187.864-333.080-205.352 333.080z" fill="#dddddd" ></path>' +
    '' +
    '<path d="M625.832 298.852c0 58.944-47.744 106.656-106.672 106.656-58.912 0-106.656-47.712-106.656-106.656s47.744-106.656 106.656-106.656c58.936 0 106.672 47.72 106.672 106.656z" fill="#E6246B" ></path>' +
    '' +
    '<path d="M519.168 192.196c-58.912 0-106.656 47.712-106.656 106.656s47.744 106.656 106.656 106.656v-213.312z" fill="#dddddd" ></path>' +
    '' +
    '<path d="M53.8 525.276l109.536 488.712h697.328z" fill="#dddddd" ></path>' +
    '' +
    '<path d="M970.2 525.276l-109.536 488.712h-697.328z" fill="#dddddd" ></path>' +
    '' +
    '<path d="M1014.648 496.412c0 0.012 0 0.026 0 0.040 0 30.486-24.714 55.2-55.2 55.2-0.023 0-0.045 0-0.068 0-0.004 0-0.012 0-0.021 0-30.477 0-55.184-24.707-55.184-55.184 0-0.020 0-0.039 0-0.059 0-0.014 0-0.033 0-0.053 0-30.477 24.707-55.184 55.184-55.184 0.008 0 0.017 0 0.025 0 0.018 0 0.040 0 0.063 0 30.486 0 55.2 24.714 55.2 55.2 0 0.014 0 0.028 0 0.042z" fill="#0067B3" ></path>' +
    '' +
    '<path d="M959.384 441.172c-0.007 0-0.016 0-0.024 0-30.477 0-55.184 24.707-55.184 55.184 0 0.020 0 0.039 0 0.059 0 0.014 0 0.033 0 0.053 0 30.477 24.707 55.184 55.184 55.184 0.008 0 0.017 0 0.025 0l-0.001-110.48z" fill="#dddddd" ></path>' +
    '' +
    '<path d="M113.448 496.412c0 0.005 0 0.010 0 0.016 0 30.499-24.725 55.224-55.224 55.224-0.017 0-0.034 0-0.051 0-0.005 0-0.013 0-0.021 0-30.495 0-55.216-24.721-55.216-55.216 0-0.008 0-0.017 0-0.025 0-0.008 0-0.019 0-0.031 0-30.491 24.717-55.208 55.208-55.208 0.011 0 0.023 0 0.034 0 0.015 0 0.035 0 0.054 0 30.495 0 55.216 24.721 55.216 55.216 0 0.008 0 0.017 0 0.025z" fill="#0067B3" ></path>' +
    '' +
    '<path d="M58.176 441.172c-0.010 0-0.021 0-0.032 0-30.491 0-55.208 24.717-55.208 55.208 0 0.011 0 0.023 0 0.034 0 0.008 0 0.019 0 0.030 0 30.491 24.717 55.208 55.208 55.208 0.011 0 0.023 0 0.034 0l-0.002-110.48z" fill="#dddddd" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)