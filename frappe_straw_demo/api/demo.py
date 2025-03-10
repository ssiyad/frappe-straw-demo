import frappe


@frappe.whitelist(allow_guest=True)
def hello_world():
	return {
		"english": "Hello, World!",
		"malayalam": "ഹലോ വേൾഡ്!",
		"hindi": "हैलो वर्ल्ड!",
		"arabic": "!مرحبا بالعالم",
	}
