##
# business-mail.jp/Makefile
#
# @file
# @version 0.1

TMP_DIR = tmp
TIMESTAMP = $(shell date +'%Y%m%d')

URL_FILE = url-list.txt
URL_PATH = $(TMP_DIR)/$(URL_FILE)

DATA_BASENAME = business-mail.jp-$(TIMESTAMP)
DATA_DIR = $(TMP_DIR)/$(DATA_BASENAME)
DATA_INDEX_PATH = $(DATA_DIR)/INDEX.csv
DATA_PATH = $(DATA_DIR).tar.gz

all:
	@mkdir -p $(DATA_DIR) && $(MAKE) $(DATA_PATH)

$(DATA_PATH): $(DATA_INDEX_PATH)
	@cd $(TMP_DIR) \
		&& tar zcvf $(DATA_BASENAME).tar.gz $(DATA_BASENAME) \
		&& cp $(DATA_BASENAME).tar.gz ../.. \
		&& cd ../..

$(DATA_INDEX_PATH): $(URL_PATH)
	@for url in $$(cat $(URL_PATH)); do \
		node bin/fetch-example $${url} > $(DATA_DIR)/$${url##*/}.json; \
	done \
	&& node bin/print-index $(URL_PATH) $(DATA_DIR) > $@

$(URL_PATH):
	@node bin/fetch-example-url-list > $@

clean:
	@rm -rf tmp/*

# end
