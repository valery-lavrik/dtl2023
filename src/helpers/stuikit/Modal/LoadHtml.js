import React, { useState } from 'react';
import $ from 'jquery'
import Loader from './../../../components/Loader';

const LoadHtml = ({url = '', title = ''}) => {
	const [html, setHtml] = useState(null);
  
	if (!html) {
		$.ajax({
			url: url,
			type: 'GET',
			success: setHtml
		});
	}

	return !!html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <Loader title={title} />
}

export default LoadHtml