from sample import SearchRequest

searchreq = SearchRequest()
searchreq.query = "John"
searchreq.page_number = 1
searchreq.results_per_page = 22

# Serialize the person object to a byte string
serialized_searchreq = searchreq.SerializeToString()
deserialized_searchreq = SearchRequest()
deserialized_searchreq.ParseFromString(serialized_searchreq)

print(deserialized_searchreq)
