import {
  Input,
  Cascader,
  InputNumber,
  AutoComplete,
  Select,
  Row,
  Col,
  Button,
  Checkbox,
  Form,
  Space,
  message,
} from "antd";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout_Page from "../../layouts/LayoutPage";
import { Link } from "../../../components/Link";
import React from "react";
import {
  groupService,
  partitionService,
  roleService,
} from "../../../services/user-management";
import classes from "./AddEdit.module.css";

export { AddEdit };

function AddEdit(props: any) {
  const group = props?.group;
  const isAddMode = !group;
  const router = useRouter();
  console.log(group);

  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 0,
      },
    },
  };

  const [form] = Form.useForm();
  const { Option } = Select;

  //Role
  const [role, setRole] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const data = await roleService.getAll();
      setRole(data);
    })();
  }, []);

  //Partition
  const [partitions, setPartitions] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await partitionService.getAll();
      setPartitions(data);
    })();
  }, []);
  const defaultPartitions = group?.PartitionMappingGroups?.map(
    (Partition: any) => {
      return `${Partition.partition_id}`;
    }
  );
  const [checkedPartition, setCheckedPartition] = useState(defaultPartitions);

  const optionPartitions = partitions.map((Partition: any) => {
    return {
      label: `${Partition.partition_name}`,
      value: `${Partition.id}`,
    };
  });

  function onChangePartition(checkedValues: any) {
    console.log("checked = ", checkedValues);
    setCheckedPartition(checkedValues);
  }

  const onFinish = async (values: any) => {
    const data = {
      group_name: values.group_name,
      group_description: values.group_description,
      default_role: values.default_role,
      partition_id: checkedPartition,
    };
    console.log(data);

    return isAddMode
      ? await groupService.create(data).then(async () => {
          message.success("Add success!");
          router.back();
        })
      : await groupService.update(group.id, data).then(async () => {
          message.success(`Edit success! ${group.id}`);
          router.back();
        });
  };

  return (
    <Layout_Page>
      {/* <h1 className={classes.txthead}>{isAddMode ? "Add Group" : `Edit Group ID: ${group.id} `}</h1> */}
      <Row className={classes.dislayout}>
        <Col span={14}>
          <Form
            {...formItemLayout}
            form={form}
            layout="vertical"
            name="createGroup"
            onFinish={onFinish}
            initialValues={
              !isAddMode
                ? {
                    group_name: `${group?.group_name}`,
                    group_description: `${group?.group_description}`,
                    default_role: `${group?.default_role}`,
                    partition: defaultPartitions,
                  }
                : []
            }
            scrollToFirstError
          >
            <Form.Item
              name={"group_name"}
              label={"Group Name"}
              rules={[
                {
                  required: true,
                  message: `Please input Group Name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="group_description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Role"
              name="default_role"
              rules={[
                {
                  required: true,
                  message: `Please Select Role`,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Search to Select Role"
                optionFilterProp="children"
              >
                {role.map((role: any) => {
                  return (
                    <Option key={role.id} value={role.id}>
                      {role.role_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item name="partition" label="Partition">
              <Checkbox.Group
                options={optionPartitions}
                onChange={onChangePartition}
              >
                <Col span={8}>
                  <Checkbox value="partition"></Checkbox>
                </Col>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" className={classes.btn}>
                  Save
                </Button>
                <Link href="/user-management/groups">
                  <Button htmlType="button" className={classes.btn}>Cancel</Button>
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout_Page>
  );
}
