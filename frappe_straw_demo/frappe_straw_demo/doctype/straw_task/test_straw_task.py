# Copyright (c) 2025, Sabu Siyad and Contributors
# See license.txt

# import frappe
from frappe.tests import IntegrationTestCase, UnitTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]


class UnitTestStrawTask(UnitTestCase):
	"""
	Unit tests for StrawTask.
	Use this class for testing individual functions and methods.
	"""

	pass


class IntegrationTestStrawTask(IntegrationTestCase):
	"""
	Integration tests for StrawTask.
	Use this class for testing interactions between multiple components.
	"""

	pass
