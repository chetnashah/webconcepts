
https://guides.codepath.com/ios/Using-UITableView

##

UITableView manages the basic appearance of the table, but your app provides the cells (`UITableViewCell` objects) that display the actual content.

Table views manage only the presentation of their data; they don’t manage the data itself

## Important protocol: UITableViewDataSource

To manage the data, you provide the table with a data source object — an object that implements the UITableViewDataSource protocol.

This protocol implement data sourcing for the tableview.

responsibilities of the data source object include:
1. (Required) Reporting the number of sections and rows in the table: `:numberOfRowsInSection`.
2. (Required) Providing cells for each row of the table: `cellForRowAt:indexPath`.
3. Providing titles for section headers and footers.
4. Configuring the table’s index, if any.
5. Responding to user- or table-initiated updates that require changes to the underlying data.


## Example implementation

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet var myTableView: UITableView!
    
    // data list
    var tasks : [String] = [String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tasks.append("hello")
        // set the delegate and datasource for tableview explicitly
        myTableView.delegate = self
        myTableView.dataSource = self
    }
}

// implement UITableViewDataSource protocol
extension ViewController: UITableViewDataSource {
    // refers data list tasks
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tasks.count;
    }
    // return UITableViewCell for a given row
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        cell.textLabel?.text = "This is row \(indexPath.row), task = \(tasks[indexPath.row])"
        return cell
    }
}

// implement UITableViewDelegate protocol
extension ViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: false)
    }
}
```

## Custom Cells

UITableViewCell is rarely appropriate for your table views. Instead, you'll often need to create a custom cell with different subviews and custom highlight and selection effects.

